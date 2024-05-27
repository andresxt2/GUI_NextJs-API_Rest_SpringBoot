"use client";
// components/Charts.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PageResultados: React.FC = () => {
  const [estadoPagosData, setEstadoPagosData] = useState<any>(null);
  const [morosidadData, setMorosidadData] = useState<any>(null);

  useEffect(() => {
    // Fetch Estado Pagos data
    axios.get('http://localhost:5022/api/Resultados/ReporteEstadoPagos')
      .then(response => {
        const data = response.data;
        const estados = data.map((item: any) => item.estado);
        const montosTotales = data.map((item: any) => item.Monto_Total);
        const totalPagos = data.map((item: any) => item.Total_Pagos);

        setEstadoPagosData({
          labels: estados,
          datasets: [
            {
              label: 'Monto Total',
              data: montosTotales,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Total Pagos',
              data: totalPagos,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching estado pagos data:', error));

    // Fetch Morosidad data
    axios.get('http://localhost:5022/api/Resultados/ReporteMorosidad')
      .then(response => {
        const data = response.data;
        const programas = data.map((item: any) => item.programa_academico);
        const montosDeuda = data.map((item: any) => item.Monto_Total_Deuda);

        setMorosidadData({
          labels: programas,
          datasets: [{
            label: 'Monto Total Deuda',
            data: montosDeuda,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        });
      })
      .catch(error => console.error('Error fetching morosidad data:', error));
  }, []);

  return (
    <main className="flex-grow mt-5">
      <section className="container mx-auto">
        <h2 className="text-center">Reporte de Estado de Pagos</h2>
        {estadoPagosData && (
          <div className="max-w-lg mx-auto">
            <Bar data={estadoPagosData} />
          </div>
        )}
      </section>
      <section className="container mx-auto mt-5">
        <h2 className="text-center">Reporte de Morosidad por Programa Académico</h2>
        {morosidadData && (
          <div className="max-w-md mx-auto">
            <Pie data={morosidadData} />
          </div>
        )}
      </section>
    </main>
  );
};

export default PageResultados;
