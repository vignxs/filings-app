import { useContext, useReducer, createContext } from "react";
import reducer from './reducer'

const initialState = {
  requests: [],
  isLogged: false
};

export const Context = createContext()

export  const useValue = () => {
  return useContext(Context);
};
  
export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{state, dispatch}}> {children} </Context.Provider>
  )
}

// export  ContextProvider