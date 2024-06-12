'use client';

import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { columns, SearchResult } from './columns';

interface BuscarClientProps {
  data: SearchResult[];
}

export const BuscarClient: React.FC<BuscarClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Resultados de la Búsqueda" description="Muestra los resultados de la búsqueda realizada." />
      </div>
      <Separator />
      <DataTable searchKeys={["nombre_tabla"]} columns={columns} data={data} />
    </>
  );
};
