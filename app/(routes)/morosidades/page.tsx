"use client";

import { useEffect, useState } from "react";
import { MorosidadClient } from "./components/client"; // Importa el componente PagosClient
import { MorosidadColumn } from "./components/columns"; // Importa la interfaz PagosColumn
import axios from "axios";

const MorosidadPage = () => {
  const [morosidades, setMorosidades] = useState<MorosidadColumn[]>([]); // Estado para almacenar los pagos

  useEffect(() => {
    const obtenerMorosidades = async () => {
      try {
        const morosidadesData = await axios.get('https://localhost:5024/api/Morosidades');// Obtiene los pagos de la API
        const sortedMorosidades = morosidadesData.data.sort((a: MorosidadColumn, b: MorosidadColumn) => b.id_morosidad - a.id_morosidad); // Ordena los pagos por id_morosidad de manera descendente
        setMorosidades(sortedMorosidades); // Actualiza el estado con los pagos obtenidos
      } catch (error) {
        console.error("Error al obtener morosidades:", error);
      }
    };

    obtenerMorosidades(); // Llama a la función para obtener pagos cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MorosidadClient data={morosidades} /> {/* Pasa los pagos al componente PagosClient */}
      </div>
    </div>
  );
};

export default MorosidadPage;
