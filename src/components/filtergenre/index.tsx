interface FilterGenreProps {
  onClose: () => void;
  onSelect: (genre: string | null) => void;
}

const FilterGenre: React.FC<FilterGenreProps> = ({ onClose, onSelect }) => {
  const genres = ["Horror", "Fantasi", "Fiksi", "Non-Fiksi"];

  return (
    <div className="absolute top-[340px] right-[30px] bg-white p-4 rounded-lg shadow-xl z-50 w-60">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Filter Genre</h3>
        <button onClick={onClose} className="text-red-500 text-sm">
          Tutup
        </button>
      </div>

      {/* Reset Filter */}
      <ul className="space-y-2">
        <li
          className="text-gray-700 hover:text-primary cursor-pointer"
          onClick={() => {
            onSelect(null); // Reset genre
            onClose();
          }}
        >
            Tampilkan Semua
        </li>

        {/* Daftar genre */}
        {genres.map((genre, i) => (
          <li
            key={i}
            className="text-gray-700 hover:text-primary cursor-pointer"
            onClick={() => {
              onSelect(genre);
              onClose();
            }}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterGenre;
