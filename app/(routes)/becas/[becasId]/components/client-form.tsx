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
  tipo_beca: z.string().optional(),
  monto: z
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

type BecasFormValues = z.infer<typeof formSchema>;

interface BecasFormProps {}

export const BecasForm: React.FC<BecasFormProps> = ({ }) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const title = initialData ? "Editar Beca" : "Crear Beca";
  const description = initialData ? "Editar una Beca." : "Añadir una nueva Beca.";
  const toastMessage = initialData ? "Beca actualizada" : "Beca creada";
  const action = initialData ? "Guardar Cambios" : "Crear Beca";

  const form = useForm<BecasFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? undefined : {
      id_estudiante: "",
      monto: 0,
      tipo_beca: "",
      semestre: "2024-A"
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
    const fetchBecaData = async (becaId: string) => {
      try {
        const becaData = await axios.get(`http://localhost:5022/api/becas/${becaId}`);
        form.reset(becaData.data);
      } catch (error) {
        console.error("Error fetching beca data:", error);
      }
    };

    if (typeof params.becasId === 'string' && params.becasId !== '0') {
      fetchBecaData(params.becasId);
      setInitialData(true);
    }
  }, [params.becasId, form]);

  const onSubmit = async (data: BecasFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`http://localhost:5022/api/becas/${params.becasId}`, data);
      } else {
        await axios.post(`http://localhost:5022/api/becas`, data);
      }
      router.refresh();
      router.push(`/../becas`);
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
      await axios.delete(`http://localhost:5022/api/becas/${params.becasId}`);
      router.refresh();
      router.push(`/becas`);
      router.refresh();
      toast.success("Beca borrada");
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
            name="monto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto*</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="Monto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipo_beca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Beca*</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de beca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Necesidad">Necesidad</SelectItem>
                      <SelectItem value="Investigacion">Investigación</SelectItem>
                      <SelectItem value="Merito">Merito</SelectItem>
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
          <Button className="ml-5" onClick={() => router.push("/becas")} type="reset">
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
