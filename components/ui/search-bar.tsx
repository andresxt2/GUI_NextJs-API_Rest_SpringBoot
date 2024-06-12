'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Redirigir a /buscar con la consulta
    router.push(`/buscar?query=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.trimStart())}
        placeholder="Buscar"
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
