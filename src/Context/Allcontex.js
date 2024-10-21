
import { createContext, useReducer, useState } from "react";
import reducer from "../Reducer/Fullproduct";

const Allcontex = createContext()

const initialdata = {
    alldata:[],
    filterdata:[]
}


const Allprovider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initialdata)
    const clearall = (dat)=>{
        return dispatch({type:"myproduct",payload:dat})
    }
    const allmydata = ()=>{
        return dispatch({type:'all'})
    }
    const mychangedata = (categ)=>{
        return dispatch({type:'change',payload:categ})
    }
    return <Allcontex.Provider value={{...state,clearall,mychangedata,allmydata}}>
        {children}
    </Allcontex.Provider>
}


export  {Allcontex,Allprovider}