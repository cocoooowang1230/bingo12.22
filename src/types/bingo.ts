export type Category = 'financial' | 'lifestyle' | 'learning' | 'travel' | 'relationships';
export type SubCategory = 'consumption' | 'enjoyment' | 'habits' | 'knowledge' | 'health' | 'personal';

export interface BingoData {
  financial: string[];
  travel: string[];
  lifestyle: {
    consumption: string[];
    enjoyment: string[];
    habits: string[];
  };
  learning: {
    knowledge: string[];
    health: string[];
    personal: string[];
  };
  relationships: string[];
}

export interface SubCategoryOption {
  id: SubCategory;
  label: string;
}