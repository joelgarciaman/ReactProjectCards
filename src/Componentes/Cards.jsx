import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "./GlobalContext";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import ModalFormAdd from "./ModalAdd"; 
import { Carta } from "./Card";

export function Cartas() {
  const { data, setData } = useContext(DataContext);
  const [ModalAbierto, setAbierto] = useState(false);

  useEffect(() => {
    fetch('https://json-server-historias.vercel.app/historias')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [setData]);

  const abrirModal = () => setAbierto(true);
  const cerrarModal = () => setAbierto(false);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 ">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="mb-4 mr-5">
              <Carta
                id={item.id}
                titulo={item.titulo}
                fecha={item.fecha}
                experiencia={item.experiencia}
                imagen={item.imagen}
              />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="bg-success w-[60px] h-[60px] rounded-full fixed bottom-5 right-5 flex items-center justify-center mt-2">
        <ModalFormAdd isOpen={ModalAbierto} onClose={cerrarModal} /> 
        <Button
          className="text-white text-3xl"
          color="success"
          size="sm"
          onPress={abrirModal}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
