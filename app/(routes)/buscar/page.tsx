'use client';

import { useEffect, useState } from "react";
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

        // Filtrar los resultados basados en la consulta
       /* const filteredResults = allResults.filter((item: SearchResult) => 
          item.ID.includes(query) || item.Nombre.toLowerCase().includes(query.toLowerCase())
        );*/

        //Agregar subconsultas dependiendo del atributo tabla hacer peticion get/id para obtener el detalle de cada tabla y el nombre del estudiante
        //con switch case tabla: "Estudiante" -> getEstudiante/id , tabla: "Pagos" -> getPagos/id , tabla Becas_Ayudas_Financieras -> getBeca/id, tabla Morosidad -> getMorosidad/id

        


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

export default BuscarPage;
