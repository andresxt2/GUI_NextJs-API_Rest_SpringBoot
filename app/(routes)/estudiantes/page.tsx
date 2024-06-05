"use client";

import { useEffect, useState } from "react";
import { EstudiantesClient } from "./components/client"; // Importa el componente ClientesClient
import { EstudiantesColumn } from "./components/columns"; // Importa la interfaz ClientesColumn
import axios from "axios";

const EstudiantePage = () => {
  const [estudiantes, setEstudiantes] = useState<EstudiantesColumn[]>([]); // Estado para almacenar los clientes

  useEffect(() => {
    const obtenerEstudiantes = async () => {
      try {
        const EstudiantesData = await axios.get('https://localhost:5024/api/estudiantes');// Obtiene los clientes de la API
        setEstudiantes(EstudiantesData.data); // Actualiza el estado con los clientes obtenidos
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    obtenerEstudiantes(); // Llama a la función para obtener clientes cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EstudiantesClient data={estudiantes} /> {/* Pasa los clientes al componente ClientesClient */}
      </div>
    </div>
  );
};

export default EstudiantePage;
