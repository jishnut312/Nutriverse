import { NextResponse } from 'next/server';
import foodsData from '@/data/foods.json';
import { Food } from '@/types/food';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const vitamin = searchParams.get('vitamin');
    const healthGoal = searchParams.get('healthGoal');
    const season = searchParams.get('season');

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
