import { NextResponse } from 'next/server';
import foodsData from '@/data/foods.json';
import { Food } from '@/types/food';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const vitamin = searchParams.get('vitamin');
    const mineral = searchParams.get('mineral');
    const healthGoal = searchParams.get('healthGoal');
    const season = searchParams.get('season');
    const nutrient = searchParams.get('nutrient');
    const benefit = searchParams.get('benefit');

    let foods = foodsData as Food[];

    // Apply filters
    if (category && category !== 'all') {
      foods = foods.filter(food => food.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      foods = foods.filter(food =>
        food.name.toLowerCase().includes(query) ||
        food.shortDescription.toLowerCase().includes(query) ||
        food.description.toLowerCase().includes(query) ||
        food.tags.some(tag => tag.toLowerCase().includes(query)) ||
        food.benefits.some(benefit => 
          benefit.category.toLowerCase().includes(query) ||
          benefit.description.toLowerCase().includes(query)
        )
      );
    }

    if (vitamin) {
      foods = foods.filter(food =>
        food.nutritionalFacts.vitamins[vitamin as keyof typeof food.nutritionalFacts.vitamins]
      );
    }

    if (mineral) {
      foods = foods.filter(food =>
        food.nutritionalFacts.minerals[mineral as keyof typeof food.nutritionalFacts.minerals]
      );
    }

    if (nutrient) {
      const query = nutrient.toLowerCase();
      foods = foods.filter(food => {
        const vitamins = Object.keys(food.nutritionalFacts.vitamins).join(' ').toLowerCase();
        const minerals = Object.keys(food.nutritionalFacts.minerals).join(' ').toLowerCase();
        return vitamins.includes(query) || minerals.includes(query);
      });
    }

    if (benefit) {
      const query = benefit.toLowerCase();
      foods = foods.filter(food =>
        food.benefits.some(b => 
          b.category.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query)
        )
      );
    }

    if (healthGoal) {
      foods = foods.filter(food =>
        food.benefits.some(benefit => benefit.category === healthGoal)
      );
    }

    if (season) {
      foods = foods.filter(food => food.season.includes(season));
    }

    // Add seasonal indicator based on current month
    const currentMonth = new Date().getMonth();
    const currentSeason = getCurrentSeason(currentMonth);
    
    foods = foods.map(food => ({
      ...food,
      isInSeason: food.season.includes(currentSeason)
    }));


    // Sort by relevance if search query exists
    if (search) {
      const query = search.toLowerCase();
      foods.sort((a, b) => {
        const aScore = getRelevanceScore(a, query);
        const bScore = getRelevanceScore(b, query);
        return bScore - aScore;
      });
    }

    return NextResponse.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch foods' },
      { status: 500 }
    );
  }
}

function getCurrentSeason(month: number): string {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

function getRelevanceScore(food: Food, query: string): number {
  let score = 0;
  const q = query.toLowerCase();
  
  // Name match (highest priority)
  if (food.name.toLowerCase().includes(q)) score += 10;
  
  // Short description match
  if (food.shortDescription.toLowerCase().includes(q)) score += 5;
  
  // Tags match
  food.tags.forEach(tag => {
    if (tag.toLowerCase().includes(q)) score += 3;
  });
  
  // Benefits match
  food.benefits.forEach(benefit => {
    if (benefit.category.toLowerCase().includes(q)) score += 4;
    if (benefit.description.toLowerCase().includes(q)) score += 2;
  });
  
  // Nutritional facts match
  const vitamins = Object.keys(food.nutritionalFacts.vitamins).join(' ').toLowerCase();
  const minerals = Object.keys(food.nutritionalFacts.minerals).join(' ').toLowerCase();
  if (vitamins.includes(q)) score += 3;
  if (minerals.includes(q)) score += 3;
  
  return score;
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, foodId } = body;

    if (action === 'favorite') {
      // In a real app, this would save to a database
      // For now, we'll just return success
      return NextResponse.json({ success: true, message: 'Favorite updated' });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
