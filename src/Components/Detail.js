import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Generate } from './Generate'
import { Delete, Edit, Update } from '@mui/icons-material'
import { Ncontext } from '../Context/Namecontext'
import Comment from './Comment'
import Updates from './Update'

const Detail = () => {
    const history = useNavigate()
    const {named} = useContext(Ncontext)
    const {id} = useParams()
    const [post,setpost] = useState({
        picture:'blogimage.avif'
    })
    useEffect(()=>{
        const fetchdata = async()=>{
            const res = await fetch(`http://localhost:8000/post/${id}`,{
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                authorization:Generate()
              }
        })
        const p = await res.json()
        setpost(p)
        }
        fetchdata()
    },[])
    const delets = async ()=>{
        const res = await fetch(`http://localhost:8000/delete/${id}`,{
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
                authorization:Generate()
              }
        })
        if(res.status === 200){
            history('/')
        }
    }
  return (
    <div  style={{width:'70%',margin:'auto',marginTop:'65px'}}>
        <img style={{height:'50vh',width:'100%',objectFit:'cover'}} src={require(`../images/${post.picture}`)} alt="" />
        {
            named.username === post.username?
            <div style={{float:'inline-end'}}>
                <Link to={`/update/${post._id}`}><Edit style={{border:'1px solid gray',padding:'6px',marginRight:'13px',color:'green'}}/></Link>
                <Delete style={{border:'1px solid gray',padding:'6px',color:'red',cursor:'pointer'}} onClick={delets}/>
            </div>:''
        }
        
        <div style={{marginTop:'59px',wordBreak:'break-word',textAlign:'center',fontSize:'30px',fontWeight:'700'}}>{post.title}</div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'14px'}}>
            <div style={{color:'gray'}}>Author:{post.username}</div>
            <div style={{color:'gray'}}>{new Date(post.createddate).toDateString()}</div>
        </div>
        <div style={{marginTop:'30px',fontSize:'30px'}}>{post.description}</div>
        <Comment post={post}/>
    </div>
  )
}

export default Detail