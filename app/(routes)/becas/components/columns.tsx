import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BecasColumn = {
    id_beca: number;
    id_estudiante: string;
    tipo_beca: string;
    monto: number;
    semestre: string;
    estado: string;
}

export const columns: ColumnDef<BecasColumn>[] = [
    {
        accessorKey: "id_beca",
        header: "ID",
    },
    {
        accessorKey: "id_estudiante",
        header: "Estudiante",
    },
    {
        accessorKey: "tipo_beca",
        header: "Tipo de Beca",
    },
    {
        accessorKey: "monto",
        header: "Monto",
        cell: ({ row }) => (
            row.original.monto !== null ? `$${row.original.monto.toFixed(2)}` : 'N/A'
        ),
    },
    {
        accessorKey: "semestre",
        header: "Semestre",
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
