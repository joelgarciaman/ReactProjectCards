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
  // Cambiamos la URL completa por el prefijo '/api' que definimos en vite.config.js
  fetch('/api/historias') 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => { 
      setData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, [setData]); // setData es estable, así que esto está bien.

  const abrirModal = () => setAbierto(true);
  const cerrarModal = () => setAbierto(false);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data && data.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className="w-full flex justify-center">
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
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <ModalFormAdd isOpen={ModalAbierto} onClose={cerrarModal} />
        <Button
          className="text-white bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-shadow duration-300"
          isIconOnly
          radius="full"
          size="lg"
          onPress={abrirModal}
        >
          <Plus size={28} />
        </Button>
      </div>
    </div>
  );
}
