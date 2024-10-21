import React from 'react'
import '../App.css'
import { Cutt } from './Generate'
const Post = ({data}) => {
  return (
        <div style={{border:'1px solid gray',margin:'0px 20px 15px 20px',height:'273px',padding:'8px',boxShadow:'9px 12px 12px -1px rgba(56,42,40,0.77)'}}>
            <img style={{height:'120px',width:'100%',objectFit:'cover'}} src={require(`../images/${data.picture}`)} alt="" />
            <div style={{fontSize:'8px',textAlign:'center',color:'gray'}}>{data.categories}</div>
            <div style={{textAlign:'center',fontSize:'21px',fontWeight:'700'}}>{Cutt(data.title,15)}</div>
            <div style={{fontSize:'10px',textAlign:'center'}}>{data.username}</div>
            <div style={{marginTop:'10px',wordBreak:'break-word'}}>{Cutt(data.description,80)}</div>
        </div>
  )
}

export default Post