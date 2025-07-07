export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  image: string;
  rating: number;
  abstract?: string;
  characters?: string[];
  score?: number;
}