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
  id_estudiante: z.string().min(1).max(13, { message: "La cédula debe tener 13 digitos." }),
  nombres: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  apellidos: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  programa_academico: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  correo_electronico: z.string().email({ message: "Debe ingresar un correo electrónico válido." }),
  estado_matricula: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
});

type EstudiantesFormValues = z.infer<typeof formSchema>;

interface EstudiantesFormProps {
}

export const EstudiantesForm: React.FC<EstudiantesFormProps> = ({ }) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar Estudiante" : "Crear Estudiante";
  const description = initialData ? "Editar un Estudiante." : "Añadir un nuevo Estudiante.";
  const toastMessage = initialData ? "Estudiante actualizado" : "Estudiante creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<EstudiantesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? undefined : {
      id_estudiante: "",
      nombres: "",
      apellidos: "",
      programa_academico: "",
      correo_electronico: "",
      estado_matricula: "",
    },
  });

  useEffect(() => {
    const fetchEstudianteData = async (id_estudiante: string) => {
      try {
        const estudianteData = await axios.get(`https://localhost:5024/api/estudiantes/${id_estudiante}`);
        form.reset(estudianteData.data); // Restablecer el formulario con los datos del cliente obtenidos
      } catch (error) {
        console.error("Error fetching estudiante data:", error);
      }
    };

    if (typeof params.estudiantesId === 'string' && params.estudiantesId !== '0') {
      // Si no hay datos iniciales pero hay un ID de cliente en los parámetros de la URL, lo usamos para buscar los datos del cliente
      fetchEstudianteData(params.estudiantesId);
      setInitialData(true);
    }
  }, [params.estudiantesId, form]);


  const onSubmit = async (data: EstudiantesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`https://localhost:5024/api/estudiantes/${params.estudiantesId}`, data);
      } else {
        await axios.post(`https://localhost:5024/api/estudiantes`, data);
      }
      router.refresh();
      router.push(`/../estudiantes`);
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
      await axios.delete(`https://localhost:5024/api/estudiantes/${params.estudiantesId}`);
      router.refresh();
      router.push(`/estudiantes`);
      router.refresh();
      toast.success("Estudiante borrado");
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
                <FormLabel>Cédula*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Cedula" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombres" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="programa_academico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programa Academico*</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Selecciona un programa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grado">Grado</SelectItem>
                      <SelectItem value="Posgrado">Posgrado</SelectItem>
                      <SelectItem value="Tecnologias">Tecnologias</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correo_electronico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Correo Electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado_matricula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado*</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Graduado">Graduado</SelectItem>
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
          <Button className="ml-5" onClick={() => router.push("/estudiantes")} type="reset">
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
