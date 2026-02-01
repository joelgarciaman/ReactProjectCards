import { createContext, useState } from 'react';
import dataHistorias from "./db.json"
// Crea el contexto
const DataContext = createContext();

// Crea un proveedor de datos
const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [dataHistoria, setDataHistoria] = useState()

  return (
    <DataContext.Provider 
    value=
    {{
      data, setData,
      dataHistoria, setDataHistoria
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

