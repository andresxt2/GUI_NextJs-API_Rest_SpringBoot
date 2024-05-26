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
  id_estudiante: z.string().min(1, { message: "Selecciona una cédula." }),
  monto_debido: z
    .coerce
    .number()
    .min(0, { message: "Debe ingresar un valor válido." })
    .int({ message: "Debe ingresar un número entero." })
    .optional(),
  dias_retraso: z
  .coerce
  .number()
  .min(0, { message: "Debe ingresar un valor válido." })
  .int({ message: "Debe ingresar un número entero." })
  .optional(),
  semestre: z.string().optional()
});

type Estudiante = {
  id_estudiante: string;
  nombres: string;
};

type MorosidadFormValues = z.infer<typeof formSchema>;

interface MorosidadFormProps {}

export const MorosidadForm: React.FC<MorosidadFormProps> = ({ }) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const title = initialData ? "Editar Morosidad" : "Crear Morosidad";
  const description = initialData ? "Editar una Morosidad." : "Añadir una nueva Morosidad.";
  const toastMessage = initialData ? "Morosidad actualizada" : "Morosidad creada";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<MorosidadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? undefined : {
      id_estudiante: "",
      monto_debido: 0,
      dias_retraso: 0,
      semestre: "",
    },
  });

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get("http://localhost:5022/api/estudiantes");
        const estudiantesData = response.data;

        setEstudiantes(estudiantesData.map((estudiante: any) => ({
          id_estudiante: estudiante.id_estudiante,
          nombres: `${estudiante.nombres} ${estudiante.apellidos}`,
        })));
      } catch (error) {
        console.error("Error fetching estudiantes:", error);
      }
    };

    fetchEstudiantes();
  }, []);

  useEffect(() => {
    const fetchMorosidadData = async (morosidadId: string) => {
      try {
        const morosidadData = await axios.get(`http://localhost:5022/api/morosidades/${morosidadId}`);
        console.log(morosidadId);
        form.reset(morosidadData.data);
      } catch (error) {
        console.error("Error fetching morosidad data:", error);
      }
    };

    if (typeof params.morosidadesId === 'string' && params.morosidadesId !== '0') {
      fetchMorosidadData(params.morosidadesId);
      setInitialData(true);
    }
  }, [params.morosidadId, form]);

  const onSubmit = async (data: MorosidadFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`http://localhost:5022/api/morosidades/${params.morosidadesId}`, data);
      } else {
        await axios.post(`http://localhost:5022/api/morosidades`, data);
      }
      router.refresh();
      router.push(`/../morosidades`);
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
      await axios.delete(`http://localhost:5022/api/morosidades/${params.morosidadesId}`);
      router.refresh();
      router.push(`/morosidades`);
      router.refresh();
      toast.success("Morosidad borrada");
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
            name="id_estudiante"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estudiante*</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un Estudiante" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {estudiantes.map((estudiante) => (
                      <SelectItem key={estudiante.id_estudiante} value={estudiante.id_estudiante}>
                        {estudiante.nombres}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monto_debido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto Debido*</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="Monto Debido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dias_retraso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dias de Retraso*</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="Dias de Retraso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="semestre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semestre*</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un semestre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2024-A">2024-A</SelectItem>
                      <SelectItem value="2024-B">2024-B</SelectItem>
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
          <Button className="ml-5" onClick={() => router.push("/morosidades")} type="reset">
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
