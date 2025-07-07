"use client"

import { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Book } from "@/types/book";
import { trendingBooks } from "@data/books/trending";
import { recommendedBooks } from "@data/books/recommended";
import { horrorBooks } from "@data/books/horror";

const BookSlider = dynamic(() => import("@/components/bookslider"), {ssr:false});
const FilterGenre = dynamic(() => import("@/components/filtergenre"), {ssr:false});


const criteriaWeights = {
  rating: 0.1,
};

const allBooks: Book[] = [
  ...trendingBooks,
  ...recommendedBooks,
  ...horrorBooks
  ];

export default function Home() {
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
const [selectedBook, setSelectedBook] = useState<Book | null>(null);

const calculateSAWScores = (books: Book[]): Book[] => {
  const maxRating = Math.max(...books.map((b) => b.rating));
  return books
    .map((book) => {
      const normalizedRating = book.rating / maxRating;
      const score = normalizedRating * criteriaWeights.rating;
      return { ...book, score };
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
};

const filteredBooks = useMemo(() => {
  return selectedGenre
    ? calculateSAWScores(allBooks.filter((book) => book.genre === selectedGenre))
    : [];
}, [selectedGenre]);

  const handleBookClick = (book: Book) => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);
  return (
    <div className="relative w-full bg-secondary min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <Image src="/Hero.svg" alt="Hero" width={1440} height={340} priority />
        <div className="absolute top-[50px] left-[35px]">
          <Image src="/LogoEbook.svg" alt="LogoEBook" width={150} height={53} />
        </div>
        <div className="absolute top-[20px] right-[180px]">
          <Image src="/LogoBuku.svg" alt="LogoBuku" width={285} height={255} />
        </div>
        <div className="text-white font-normal font-[Anuphan] absolute top-[100px] left-[35px]">
          Selami samudra kata di Bibliotheca! Perpustakaan e-book terlengkap <br />
          menanti Anda, dengan kategori seperti Genre, Serial, Non-Serial, dan <br />
          koleksi Terbaru. Nikmati juga pilihan rekomendasi cerdas dari sistem <br />
          SAW kami. Temukan buku impian Anda!
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="absolute top-[340px] right-[30px] z-50"
        >
          <Image src="/LogoFilter.svg" alt="Filter Icon" width={28} height={28} />
        </button>
        {isFilterOpen && (
          <FilterGenre
            onClose={() => setIsFilterOpen(false)}
            onSelect={(genre) => setSelectedGenre(genre)}
          />
        )}
      </div>

      {/* Content Section */}
      <div className="mt-4 px-6 pb-10">
        {selectedGenre ? (
          <BookSlider 
            title={`Genre: ${selectedGenre}`} 
            books={filteredBooks} 
            onBookClick={handleBookClick}
          />
        ) : (
          <>
            <BookSlider 
              title="Trending" 
              books={trendingBooks} 
              onBookClick={handleBookClick}
            />
            <BookSlider 
              title="Recommendation" 
              books={recommendedBooks} 
              onBookClick={handleBookClick}
            />
          </>
        )}
      </div>

      {/* Transparent Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-700 hover:text-gray-900 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="relative h-64 bg-gray-100 rounded-lg">
                    <Image
                      src={selectedBook.image}
                      alt={selectedBook.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Author:</span> {selectedBook.author}
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Genre:</span> {selectedBook.genre}
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    <span className="font-semibold">Rating:</span> {selectedBook.rating}/5
                  </p>
                    {selectedBook.score !== undefined && (
                      <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">SAW Score:</span> {selectedBook.score.toFixed(3)}
                      </p>
                    )}
                  {selectedBook.abstract && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Sinopsis</h3>
                      <p className="text-gray-700">{selectedBook.abstract}</p>
                    </div>
                  )}
                  {selectedBook.characters && selectedBook.characters.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Tokoh Utama</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {selectedBook.characters.map((character, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            <span className="text-gray-700">{character}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}