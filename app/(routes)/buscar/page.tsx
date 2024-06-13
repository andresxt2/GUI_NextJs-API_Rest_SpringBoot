'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { DataTable } from "@/components/ui/data-table";
import { SearchResult, columns } from "./components/columns";
import axios from "axios";

const BuscarPage = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || ''; // Asegurarse de que query nunca sea null

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://localhost:5024/api/Resultados/ReporteEnteroFinal/${query}`);
        const allResults = response.data;
        setResults(allResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DataTable searchKeys={["Tabla"]} columns={columns} data={results} />
      </div>
    </div>
  );
};

const SuspendedBuscarPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BuscarPage />
  </Suspense>
);

export default SuspendedBuscarPage;
