import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SearchResult = {
  nombre_tabla: string;
  ID: string;
  Nombre: string;
  Detalle: string;
};

export const columns: ColumnDef<SearchResult>[] = [
  {
    accessorKey: "nombre_tabla",
    header: "Tabla",
  },
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Nombre",
    header: "Nombre",
  },
  {
    accessorKey: "Detalle",
    header: "Detalle",
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
