export type PrefixCategory = 'general' | 'development' | 'translation' | 'language';

export interface Prefix {
  id: string;
  text: string;
  category: PrefixCategory;
  color: string;
  variables?: string[];
  usageCount: number;
  lastUsed?: Date;
}