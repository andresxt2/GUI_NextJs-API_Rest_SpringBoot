"use client";

import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, BecasColumn } from "./columns";

interface BecasClientProps {
  data: BecasColumn[];
}

export const BecasClient: React.FC<BecasClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Becas`} description="Administrar Becas" />
        <Button onClick={() => router.push(`becas/0`)}>
          <Plus className="mr-2 h-4 w-4"/>
          Añadir</Button>
      </div>
      <Separator />
      <Button onClick={() => router.push('/')}>
          <ArrowBigLeft className="mr-2 h-6 w-6"/>
          Regresar
      </Button>
      <DataTable searchKeys={["id_beca"]} columns={columns} data={data} />
    </>
  );
};