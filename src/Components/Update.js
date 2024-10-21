import { Box, Button, FormControl,InputBase,TextareaAutosize,styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import {AddCircle} from '@mui/icons-material'
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import { Ncontext } from '../Context/Namecontext'
import axios from 'axios'
import { Generate } from './Generate'

const Contain = styled(Box)`
display: flex;
    flex-direction: column;
    width: 75%;
    margin: auto;
`
const Img = styled('img')({
    height:'50vh'
})

const Textarea = styled(TextareaAutosize)`
border: none;
    margin-top: 42px;
    font-size: 18px;
    &:focus-visible{
        outline:none
    }
`
const initialdata = {
    username:'',
    title:'',
    description:'',
    categories:'',
    picture:'',
    createddate:new Date()
}



const Update = () => {
    // setTimeout(()=>{
    //     seturl()
    //     setimag(false)
    // },4000)
    
    const [createdata,setcreatedata] = useState(initialdata)
    const [file,setfile] = useState('')
    const {named} = useContext(Ncontext)
    const [imag,setimag] = useState(false)
    const mychange = (e)=>{
        console.log(e.target.files[0].type)
        if(e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png'){
            window.alert('Send only images(png,jpeg)')
            return 
        }
        setfile(e.target.files[0])
    }
const changein = (e)=>{
    setcreatedata({...createdata,[e.target.name]:e.target.value})
}
const location = useLocation()
const {id} = useParams()
    const [urls,seturls] = useState(require(`../images/blogimage.avif`))
    
    
    useEffect(()=>{
        const getimage = async ()=>{
            if(file){
                const data = new FormData()
                // data.append('name',file.name)
                data.append('file',file)
                // Api
                const ress = await axios.post('http://localhost:8000/upload-image',data,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }})
                setcreatedata({...createdata,picture:ress.data.imagename})
                setimag(true)
                setTimeout(() => {
                    setimag(false)
                    console.log('helo')
                }, 4000);
            }
        }
        getimage()
        createdata.categories = location.search?.split('=')[1] || 'All'
        createdata.username = named.username
    },[file])
    
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
        setcreatedata({...createdata,username:p.username,title:p.title,description:p.description,categories:p.categories,picture:p.picture})
        }
        fetchdata()
    },[])

    const seturl = ()=>{
        seturls(require(`../images/${createdata.picture?createdata.picture:'blogimage.avif'}`))
    }
const history = useNavigate()
const savepost = async ()=>{
    //Api
    const {username,title,description,categories} = createdata
    console.log(createdata)
    if(!username || !title || !description || !categories){
        window.alert('fill full post')
        return
    }
    const res =await fetch(`http://localhost:8000/update/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        authorization:Generate()
      },
      body:JSON.stringify(createdata)
    }) 
    if(res.status === 200){
        history(`/detail/${id}`)
    }
    console.log(res.status)
}
  return (
    <Contain>
        <Img src={urls} style={{marginTop:'67px'}} alt='photo'/>
        <FormControl style={{marginTop:'12px',display:'flex',flexDirection:'row'}}>
            <label htmlFor='inputdata'>
                <AddCircle fontSize='large'/>
            </label>
            <input onChange={(e)=>mychange(e)}  id='inputdata' type='file' style={{display:'none',flex:'1'}}></input>
            <InputBase value={createdata.title} onChange={(e)=>changein(e)} name='title' style={{flex:'1',margin:'0 10px 0 10px',fontSize:'23px'}} placeholder='Title'/>
            {
                imag?<Button variant='contained' style={{backgroundColor:'#7caedf'}}>Loding Photo</Button>:<Button variant='contained' onClick={seturl}>Submit Photo</Button>
            }
        </FormControl>
        <Textarea value={createdata.description} onChange={(e)=>changein(e)} name='description' minRows={5} placeholder='Tell Your Story....'></Textarea>
        <Button variant='contained' style={{width:'104px'}} onClick={savepost}>Update</Button>
    </Contain>
  )
}

export default Update