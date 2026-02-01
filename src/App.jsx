
import { Cartas } from "./Componentes/Cards";
import ModalForm from "./Componentes/ModalForm";


export default function App() {
  return (
    <div className="container mx-auto dark:bg-black">
       <Cartas />
      <ModalForm></ModalForm>
    </div>
    
  );
}

