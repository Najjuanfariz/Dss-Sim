import Image from "next/image";
import { Book } from "@data/books";

interface BookSliderProps {
  title: string;
  books: Book[];
  onBookClick: (book: Book) => void;
}

const BookSlider: React.FC<BookSliderProps> = ({ title, books, onBookClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-[20px] font-[Anaphon] font-normal mb-3 text-black">
        {title}
      </h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => onBookClick(book)} // Tambahkan handler klik
            className="min-w-[190px] max-w-[190px] flex-shrink-0 rounded overflow-hidden shadow border-4 border-white bg-[#D9D9D9] cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48"> {/* Tambahkan container dengan fixed height */}
              <Image
                src={book.image}
                alt={book.title}
                fill
                priority={true}
                quality={100}
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="font-semibold text-center flex justify-center top-1.5">
                {book.title}
              </p>
              <p className="text-sm text-center text-gray-600 mt-1">
                {book.author}
              </p>
              {book.rating && (
                <div className="flex justify-center items-center mt-5">
                  <span className="text-yellow-500 text-[25px] translate-x-[-2px] translate-y-[-5px]">★</span>
                  <span className="text-xs font-[alexandria] font-extrabold ml-1">{book.rating}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSlider;