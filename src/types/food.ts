export interface NutritionalFacts {
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  sugar: number;
  fat: number;
  vitamins: {
    A?: number;
    B1?: number;
    B2?: number;
    B3?: number;
    B6?: number;
    B12?: number;
    C?: number;
    D?: number;
    E?: number;
    K?: number;
    folate?: number;
  };
  minerals: {
    calcium?: number;
    iron?: number;
    magnesium?: number;
    phosphorus?: number;
    potassium?: number;
    sodium?: number;
    zinc?: number;
  };
}

export interface HealthBenefit {
  category: 'hair' | 'skin' | 'immunity' | 'heart' | 'brain' | 'digestion' | 'bones' | 'energy' | 'weight' | 'eyes';
  description: string;
  icon: string;
}

export interface Food {
  id: string;
  name: string;
  slug: string;
  category: 'fruit' | 'vegetable' | 'herb';
  image: string;
  shortDescription: string;
  description: string;
  nutritionalFacts: NutritionalFacts;
  benefits: HealthBenefit[];
  tags: string[];
  season: string[];
  funFact?: string;
  isInSeason?: boolean;
}

export interface FilterOptions {
  category?: 'fruit' | 'vegetable' | 'herb' | 'all';
  vitamin?: string;
  healthGoal?: string;
  season?: string;
}

export interface SearchParams {
  query?: string;
  filters?: FilterOptions;
}
