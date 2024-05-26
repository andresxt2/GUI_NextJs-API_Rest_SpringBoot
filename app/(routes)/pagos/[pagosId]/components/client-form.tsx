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
  cod_pago: z.string().optional(),
  saldo: z
    .coerce
    .number()
    .min(0, { message: "Debe ingresar un valor válido." })
    .int({ message: "Debe ingresar un número entero." })
    .optional(),
  fecha_pago: z.string(),
  estado: z.string().optional(),
  semestre: z.string().optional()
});

type Estudiante = {
  id_estudiante: string;
  nombres: string;
};

type PagosFormValues = z.infer<typeof formSchema>;

interface PagosFormProps {}

export const PagosForm: React.FC<PagosFormProps> = ({ }) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const title = initialData ? "Editar Pago" : "Crear Pago";
  const description = initialData ? "Editar un Pago." : "Añadir un nuevo Pago.";
  const toastMessage = initialData ? "Pago actualizado" : "Pago creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<PagosFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? undefined : {
      id_estudiante: "",
      saldo: 0,
      cod_pago: "",
      fecha_pago: "",
      estado: "pendiente",
      semestre: "Semestre 2024-A"
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
    const fetchPagoData = async (pagoId: string) => {
      try {
        const pagoData = await axios.get(`http://localhost:5022/api/pagos/${pagoId}`);
        form.reset(pagoData.data);
      } catch (error) {
        console.error("Error fetching pago data:", error);
      }
    };

    if (typeof params.pagosId === 'string' && params.pagosId !== '0') {
      fetchPagoData(params.pagosId);
      setInitialData(true);
    }
  }, [params.pagosId, form]);

  const onSubmit = async (data: PagosFormValues) => {
    try {
      setLoading(true);
      const formattedData = {
        ...data,
        fecha_pago: new Date(data.fecha_pago).toISOString(),
      };
      if (initialData) {
        await axios.put(`http://localhost:5022/api/pagos/${params.pagosId}`, formattedData);
      } else {
        await axios.post(`http://localhost:5022/api/pagos`, formattedData);
      }
      router.refresh();
      router.push(`/../pagos`);
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
      await axios.delete(`http://localhost:5022/api/pagos/${params.pagosId}`);
      router.refresh();
      router.push(`/pagos`);
      router.refresh();
      toast.success("Pago borrado");
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
            name="saldo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Saldo*</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="Saldo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_pago"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Pago*</FormLabel>
                <FormControl>
                  <Input type="date" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado*</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="pagado">Pagado</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="Semestre 2024-A">2024-A</SelectItem>
                      <SelectItem value="Semestre 2024-B">2024-B</SelectItem>
                      <SelectItem value="Semestre 2024-Verano-Idiomas">2024-Verano-Idiomas</SelectItem>
                      <SelectItem value="Semestre 2024-Invierno-Idiomas">2024-Invierno-Idiomas</SelectItem>
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
          <Button className="ml-5" onClick={() => router.push("/pagos")} type="reset">
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
