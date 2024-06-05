"use client";

import { useEffect, useState } from "react";
import { BecasClient } from "./components/client"; // Importa el componente ClientesClient
import { BecasColumn } from "./components/columns"; // Importa la interfaz ClientesColumn
import axios from "axios";

const BecaPage = () => {
  const [becas, setBecas] = useState<BecasColumn[]>([]); // Estado para almacenar los clientes

  useEffect(() => {
    const obtenerBecas = async () => {
      try {
        const PagosData = await axios.get('https://localhost:5024/api/becas');// Obtiene los clientes de la API
        const sortedBecas = PagosData.data.sort((a: BecasColumn, b: BecasColumn) => b.id_beca - a.id_beca); // Ordena los pagos por id_pago de manera descendente
        setBecas(sortedBecas); // Actualiza el estado con los clientes obtenidos
      } catch (error) {
        console.error("Error al obtener pagos:", error);
      }
    };

    obtenerBecas(); // Llama a la función para obtener clientes cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BecasClient data={becas} /> {/* Pasa los clientes al componente ClientesClient */}
      </div>
    </div>
  );
};

export default BecaPage;


