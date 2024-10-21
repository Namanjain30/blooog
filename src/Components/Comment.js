import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Ncontext } from '../Context/Namecontext'
import { Generate } from './Generate'
import { Delete } from '@mui/icons-material'

const initialdata = {
    name:'',
    postid:'',
    comment:'',
    date:new Date()
}
const Comment = ({post}) => {
    const [cdata,setcdata] = useState([])
    const {named}= useContext(Ncontext)
    const [toogle,settoogle] = useState(false)
    
    const [data,setdata] = useState(initialdata)
    const change = (e)=>{
        setdata({...data,name:named.username,postid:post._id,comment:e.target.value,date:new Date()})
    }
    const deletei = async (cdata,index)=>{
        const res = await fetch(`http://localhost:8000/deletei/${cdata[index]._id}`,{
            method:'DELETE'
        })
        if(res.status === 200){
            settoogle(prevstate => !prevstate)
        }
    }
    const setchange = async()=>{
        const res = await fetch('http://localhost:8000/comment/new',{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                authorization:Generate()
            },
            body:JSON.stringify(data)
        })
        if(res.status === 200){
            setdata(initialdata)
        }
        settoogle(prevstate => !prevstate)
    }
    useEffect(()=>{
        const fetchs = async()=>{
            const res = await fetch(`http://localhost:8000/comment/${post._id}`,{
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                authorization:Generate()
              }
        })
        if(res.status === 200){
            const dat = await res.json()
            setcdata(dat)
        }
        }
        fetchs()
    },[post,toogle])
  return (
    <div>
        <div style={{marginTop:'30px',display:'flex',alignItems:'center',marginBottom:'20px'}}>
            <img style={{height:'39px',marginRight:'18px'}} alt='images' src='https://static.thenounproject.com/png/12017-200.png'/>
            <textarea value={data.comment} onChange={(e)=>change(e)} style={{width:'81%',height:'61px',marginRight:'23px'}} placeholder='Write your comment'></textarea>
            <Button variant='contained' onClick={setchange}>Post</Button>
        </div>
        <div>
            {
                cdata && cdata.length>0 && cdata.map((comm,index)=>{
                    return <>
                    <div style={{marginBottom:'30px',marginTop:'30px',backgroundColor:'ghostwhite',minHeight:'100px',padding:'15px'}}>
                        <div style={{display:'flex'}}>
                            <div style={{fontWeight:'700'}}>{comm.name}</div>
                            <div style={{marginLeft:'20px',color:'gray'}}>{new Date(comm.date).toDateString()}</div>
                            <div style={{marginLeft:'auto',marginRight:'20px',color:'red'}}>
                                {
                                    named.username === comm.name?<Delete onClick = {(e)=>deletei(cdata,index)} style={{cursor:'pointer'}}/>:''
                                }
                            </div>
                        </div>
                        <div style={{marginTop:'3px',fontSize:'18px',wordBreak:'break-word'}}>{comm.comment}</div>
                    </div>
                    </>
                })
            }
        </div>
    </div>
  )
}

export default Comment