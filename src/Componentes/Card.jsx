import { useState, useContext } from "react";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";
import { DataContext } from "./GlobalContext";
import ModalForm from "./ModalForm";

export function Carta({ id, titulo, fecha, experiencia, imagen }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const { setDataHistoria, data, setData } = useContext(DataContext);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const controladorEditarHistoria = () => {
    setDataHistoria({ id, titulo, fecha, experiencia, imagen });
    abrirModal();
  };

  const controladorBorrarHistoria = async () => {
    try {
      const response = await fetch(
        `https://json-server-historias.vercel.app/historias/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la historia");
      }

      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error al eliminar la historia:", error);
    }
  };

  return (
    <div>
      <Card className="relative h-[280px] w-full max-w-[380px] overflow-hidden">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {titulo}
          </p>
          <h4 className="text-white/90 font-medium text-xl">{fecha}</h4>
        </CardHeader>

        <Image
          removeWrapper
          alt={titulo}
          className="z-0 w-full h-full object-cover"
          src={imagen}
        />

        <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t border-default-600">
          <div className="flex flex-grow items-center">
            <p className="text-tiny text-white/80">{experiencia}</p>
          </div>

          <Button
            className="bg-black/20 mx-1"
            color="success"
            variant="bordered"
            radius="lg"
            size="sm"
            onPress={controladorEditarHistoria}
          >
            <Pencil size={16} />
          </Button>

          <Button
            className="bg-black/20 mx-1"
            color="danger"
            variant="bordered"
            radius="lg"
            size="sm"
            onPress={controladorBorrarHistoria}
          >
            <Trash2 size={16} />
          </Button>

          <ModalForm isOpen={modalAbierto} onClose={cerrarModal} />
        </CardFooter>
      </Card>
    </div>
  );
}