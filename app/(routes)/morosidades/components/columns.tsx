import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type MorosidadColumn = {
    id_morosidad: number;
    id_estudiante: string;
    semestre: string;
    monto_debido: number;
    dias_retraso: number;
    Estudiantes: {
        nombres: string;
        apellidos: string;
    };
}

export const columns: ColumnDef<MorosidadColumn>[] = [
    {
        accessorKey: "id_morosidad",
        header: "ID",
    },
    {
        accessorKey: "id_estudiante",
        header: "Cliente",
    },
    {
        accessorFn: (row) => `${row.Estudiantes.nombres} ${row.Estudiantes.apellidos}`,
        accessorKey: "nombres_apellidos",
        header: "Estudiantes",
    },
    {
        accessorKey: "monto_debido",
        header: "Monto",
        cell: ({ row }) => (
            row.original.monto_debido !== null ? `$${row.original.monto_debido.toFixed(2)}` : 'N/A'
        ),
    },
    {
        accessorKey: "dias_retraso",
        header: "Dias de retraso",
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
