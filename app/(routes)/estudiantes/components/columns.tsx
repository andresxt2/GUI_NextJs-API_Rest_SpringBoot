import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type EstudiantesColumn = {
    id_estudiante: string;
    nombres: string;
    apellidos: string;
    programa_academico: string;
    correo_electronico: string;
    estado_matricula: string;
}

export const columns: ColumnDef<EstudiantesColumn>[] = [
    {
        accessorKey: "id_estudiante",
        header: "ID",
    },
    {
        accessorKey: "nombres",
        header: "Nombre",
    },
    {
        accessorKey: "apellidos",
        header: "Apellido",
    },
    {
        accessorKey: "programa_academico",
        header: "Programa Academico",
    },
    {
        accessorKey: "correo_electronico",
        header: "Email",
    },
    {
        accessorKey: "estado_matricula",
        header: "Estado",
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
