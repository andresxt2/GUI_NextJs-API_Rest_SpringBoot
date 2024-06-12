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

        // Realizar subconsultas dependiendo del atributo "Tabla" para obtener el detalle de cada tabla y el nombre del estudiante
        const updatedResults = await Promise.all(allResults.map(async (item) => {
          let response;
          switch (item.Tabla) {
            case "Estudiantes":
              response = await axios.get(`https://localhost:5024/api/Estudiantes/${item.ID}`);
              if (response.data && response.data.nombres) {
                item.Nombre = response.data.nombres + " " + response.data.apellidos;
              } else {
                item.Nombre = 'Nombre no disponible';
              }
              break;
            case "Pagos":
              response = await axios.get(`https://localhost:5024/api/Pagos/${item.ID}`);
              if (response.data && response.data.Estudiantes.nombres) {
                item.Nombre = response.data.Estudiantes.nombres + " " + response.data.Estudiantes.apellidos; // Cambia esto si necesitas un campo diferente
              } else {
                item.Nombre = 'ID no disponible';
              }
              break;
            case "Morosidad":
              response = await axios.get(`https://localhost:5024/api/Morosidades/${item.ID}`);
              if (response.data && response.data.Estudiantes.nombres) {
                item.Nombre = response.data.Estudiantes.nombres  + " " + response.data.Estudiantes.apellidos; // Cambia esto si necesitas un campo diferente
              } else {
                item.Nombre = 'ID no disponible';
              }
              break;
            case "Becas_Ayudas_Financieras":
              response = await axios.get(`https://localhost:5024/api/Becas/${item.ID}`);
              if (response.data && response.data.Estudiantes.nombres) {
                item.Nombre = response.data.Estudiantes.nombres +  " " + response.data.Estudiantes.apellidos; ; // Cambia esto si necesitas un campo diferente
              } else {
                item.Nombre = 'ID no disponible';
              }
              break;
            default:
              item.Nombre = 'Tabla no reconocida';
              break;
          }
          return item;
        }));

        setResults(updatedResults);
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
