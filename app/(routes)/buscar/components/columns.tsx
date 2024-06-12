import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SearchResult = {
  Tabla: string;
  ID: string;
  Nombre: string;
  Detalle: string;
};

export const columns: ColumnDef<SearchResult>[] = [
  {
    accessorKey: "Tabla",
    header: "Tabla",
  },
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "NombreCompleto",
    header: "Nombre",
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
