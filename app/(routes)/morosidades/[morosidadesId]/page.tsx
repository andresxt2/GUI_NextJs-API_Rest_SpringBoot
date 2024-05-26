"use client";

import { MorosidadForm } from "@/app/(routes)/morosidades/[morosidadesId]/components/client-form";


const MorosidadesPageAdd = ({ 

}) => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MorosidadForm /> {}
      </div>
    </div>
  );
};

export default MorosidadesPageAdd;
