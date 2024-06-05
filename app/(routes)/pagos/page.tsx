"use client";

import { useEffect, useState } from "react";
import { PagosClient } from "./components/client"; // Importa el componente ClientesClient
import { PagosColumn } from "./components/columns"; // Importa la interfaz ClientesColumn
import axios from "axios";

const PagoPage = () => {
  const [pagos, setPagos] = useState<PagosColumn[]>([]); // Estado para almacenar los clientes

  useEffect(() => {
    const obtenerPagos = async () => {
      try {
        const PagosData = await axios.get('https://localhost:5024/api/pagos');// Obtiene los clientes de la API
        const sortedPagos = PagosData.data.sort((a: PagosColumn, b: PagosColumn) => b.id_pago - a.id_pago); // Ordena los pagos por id_pago de manera descendente
        setPagos(sortedPagos); // Actualiza el estado con los clientes obtenidos
      } catch (error) {
        console.error("Error al obtener pagos:", error);
      }
    };

    obtenerPagos(); // Llama a la función para obtener clientes cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PagosClient data={pagos} /> {/* Pasa los clientes al componente ClientesClient */}
      </div>
    </div>
  );
};

export default PagoPage;
