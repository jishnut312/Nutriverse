import { NextResponse } from 'next/server';
import foodsData from '@/data/foods.json';
import { Food } from '@/types/food';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const foods = foodsData as Food[];
    const food = foods.find(f => f.slug === resolvedParams.slug);

    if (!food) {
      return NextResponse.json(
        { error: 'Food not found' },
        { status: 404 }
      );
    }

    // Add seasonal indicator
    const currentMonth = new Date().getMonth();
    const currentSeason = getCurrentSeason(currentMonth);
    
    const foodWithSeason = {
      ...food,
      isInSeason: food.season.includes(currentSeason)
    };

    return NextResponse.json(foodWithSeason);
  } catch (error) {
    console.error('Error fetching food:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food' },
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
