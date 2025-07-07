import { trendingBooks } from "./trending";
import { recommendedBooks } from "./recommended";
import { horrorBooks } from "./horror";

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  image: string;
  rating: number;
  abstract?: string;
  characters?: string[];
}

export const allBooks: Book[] = [
  ...trendingBooks,
  ...recommendedBooks,
  ...horrorBooks
];

export { trendingBooks, recommendedBooks, horrorBooks };