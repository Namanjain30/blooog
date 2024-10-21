import { createContext, useState } from "react";


const Ncontext = createContext()

const ndata = {
    username:'',
    name:''
}


const Nprovider = ({children})=>{
    const [named,setnamed] = useState(ndata)
    return <Ncontext.Provider value={{named,setnamed}}>
        {children}
    </Ncontext.Provider>
}

export {Ncontext,Nprovider}