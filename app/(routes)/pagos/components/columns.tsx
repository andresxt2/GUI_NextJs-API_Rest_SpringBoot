import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PagosColumn = {
    id_pago: number;
    id_estudiante: string;
    cod_pago: string;
    fecha_pago: string;
    saldo: number;
    semestre: string;
    estado: string;
}

export const columns: ColumnDef<PagosColumn>[] = [
    {
        accessorKey: "id_pago",
        header: "ID",
    },
    {
        accessorKey: "id_estudiante",
        header: "Estudiante",
    },
    {
        accessorKey: "cod_pago",
        header: "Código de Pago",
    },
    {
        accessorKey: "saldo",
        header: "Saldo",
        cell: ({ row }) => (
            row.original.saldo !== null ? `$${row.original.saldo.toFixed(2)}` : 'N/A'
        ),
    },
    {
        accessorKey: "fecha_pago",
        header: "Fecha de Pago",
    },
    {
        accessorKey: "estado",
        header: "Estado de Pago",
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
