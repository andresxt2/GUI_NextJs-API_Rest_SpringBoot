"use client";

import { BecasForm } from "@/app/(routes)/becas/[becasId]/components/client-form";


const BecasPageAdd = ({ 

}) => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BecasForm /> {}
      </div>
    </div>
  );
};

export default BecasPageAdd;
