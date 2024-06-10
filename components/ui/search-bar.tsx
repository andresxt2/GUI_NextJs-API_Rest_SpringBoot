import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const options = ['estudiantes', 'becas', 'pagos', 'morosidades'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setSuggestions(value ? options.filter(option => option.includes(value)) : []);
  };

  const handleSearch = (option?: string) => {
    const searchQuery = option || query;
    switch (searchQuery) {
      case 'estudiantes':
        router.push('/estudiantes');
        break;
      case 'becas':
        router.push('/becas');
        break;
      case 'pagos':
        router.push('/pagos');
        break;
      case 'morosidades':
        router.push('/morosidades');
        break;
      default:
        alert('No hay resultados para esa búsqueda.');
    }
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative flex items-center space-x-2">
      <Input 
        placeholder="Buscar..." 
        value={query}
        onChange={handleInputChange}
        className="max-w-xs"
      />
      <Button onClick={() => handleSearch()} className="bg-black text-white">
        Buscar
      </Button>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSearch(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
