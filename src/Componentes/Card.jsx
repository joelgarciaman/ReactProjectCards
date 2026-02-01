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
    <div className="group h-full w-full">
      <Card className="relative h-[320px] w-full max-w-[380px] overflow-hidden border-none bg-transparent shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl">
        <CardHeader className="absolute z-20 top-0 flex-col items-start bg-gradient-to-b from-black/80 to-transparent p-4 pb-8">
          <p className="text-tiny text-cyan-300 font-bold tracking-wider uppercase drop-shadow-md">
            {titulo}
          </p>
          <h4 className="text-white font-bold text-2xl drop-shadow-lg tracking-tight">{fecha}</h4>
        </CardHeader>

        <Image
          removeWrapper
          alt={titulo}
          className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imagen}
        />

        <CardFooter className="absolute bottom-0 z-20 flex-row justify-between border-t border-white/10 bg-black/40 backdrop-blur-md p-4 transition-all duration-300 group-hover:bg-black/60">
          <div className="flex flex-col flex-grow items-start mr-2">
            <p className="text-sm text-gray-200 font-light leading-relaxed line-clamp-2">{experiencia}</p>
          </div>

          <div className="flex gap-2">
            <Button
              className="bg-white/10 text-white hover:bg-white/20 border border-white/20"
              isIconOnly
              radius="full"
              size="sm"
              onPress={controladorEditarHistoria}
            >
              <Pencil size={18} />
            </Button>

            <Button
              className="bg-danger/20 text-danger-400 hover:bg-danger/30 hover:text-danger-200 border border-danger/20"
              isIconOnly
              radius="full"
              size="sm"
              onPress={controladorBorrarHistoria}
            >
              <Trash2 size={18} />
            </Button>
          </div>

          <ModalForm isOpen={modalAbierto} onClose={cerrarModal} />
        </CardFooter>
      </Card>
    </div>
  );
}