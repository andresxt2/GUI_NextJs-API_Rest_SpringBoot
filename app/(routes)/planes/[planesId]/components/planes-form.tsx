import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  tipoplanNombre: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  tipoplanDuracion: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  tipoplanPrecio: z.optional(z.coerce.number().min(0, { message: "Debe ingresar un valor válido."})),
  tipoplanImagen: z.optional(z.string()),
  tipoplanEstado: z.boolean(),
});

type PlanesFormValues = z.infer<typeof formSchema>;

interface PlanesFormProps {
}

export const PlanesForm: React.FC<PlanesFormProps> = ({ }) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar Plan" : "Crear Plan";
  const description = initialData ? "Editar un Plan." : "Añadir un nuevo Plan.";
  const toastMessage = initialData ? "Plan actualizado" : "Plan creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<PlanesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? undefined : {
      tipoplanDuracion: "",
      tipoplanNombre: "",
      tipoplanPrecio: 0,
      tipoplanImagen: "",
      tipoplanEstado: true,
    },
  });

  useEffect(() => {
    const fetchPlanData = async (planId: string) => {
      try {
        const planData = await axios.get(`http://localhost:4000/plan/${planId}`);
        form.reset(planData.data); // Restablecer el formulario con los datos del plan obtenidos
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    if (typeof params.planesId === 'string' && params.planesId !== '0') {
      // Si no hay datos iniciales pero hay un ID de plan en los parámetros de la URL, lo usamos para buscar los datos del plan
      fetchPlanData(params.planesId);
      setInitialData(true);
    }
  }, [params.planesId, form]);


  const onSubmit = async (data: PlanesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`http://localhost:4000/plan/${params.planesId}`, data);
      } else {
        await axios.post(`http://localhost:4000/plan`, data);
      }
      router.refresh();
      router.push(`/../planes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Algo estuvo mal.");
    } finally {
      setLoading(false);
    }
  };
  

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/plan/${params.planesId}`);
      router.refresh();
      router.push(`/planes`);
      router.refresh();
      toast.success("Plan borrado");
    } catch (error: any) {
      toast.error("Algo salió mal.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-7">
        <FormField
            control={form.control}
            name="tipoplanNombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipoplanDuracion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duración*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Duración" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipoplanPrecio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio*</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="Precio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipoplanImagen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Imagen</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Imagen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipoplanEstado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={(selectedValue) => {
                      field.onChange(selectedValue === "true");
                    }}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={String(field.value)} placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
          <Button className="ml-5" onClick={() => router.push("/planes")} type="reset">
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};