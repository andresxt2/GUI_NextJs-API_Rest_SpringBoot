'use client';

import { ArrowRight, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { SearchResult } from "./columns";

interface CellActionProps {
  data: SearchResult;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/${getTableName(data.Tabla)}/${data.ID}`);
  };

  const getTableName = (tableName: string) => {
    switch (tableName) {
      case 'Estudiantes':
        return 'estudiantes';
      case 'Pagos':
        return 'pagos';
      case 'Morosidad':
        return 'morosidades';
      case 'Becas_Ayudas_Financieras':
        return 'becas';
      default:
        return tableName.toLowerCase();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleRedirect}>
          <ArrowRight className="mr-2 h-4 w-4" /> Ver Detalles
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
