import { Box, Button, FormControl,InputBase,InputLabel,MenuItem,Select,TextareaAutosize,styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import {AddCircle} from '@mui/icons-material'
import { useNavigate} from 'react-router-dom'
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
    picture:'blogimage.avif',
    createddate:new Date()
}



const Createpost = () => {
    const [urls,seturls] = useState(require('../images/blogimage.avif'))
    const [createdata,setcreatedata] = useState(initialdata)
    const [file,setfile] = useState('')
    const [imag,setimag] = useState(false)
    const [mycatego,setcatego] = useState('Movie')
    const {named} = useContext(Ncontext)
const changein = (e)=>{
    setcreatedata({...createdata,[e.target.name]:e.target.value})
}
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
            createdata.picture = ress.data.imagename
            setimag(true)
            setTimeout(() => {
                setimag(false)
                console.log('helo')
            }, 4000);
        }
    }
    getimage()

    createdata.username = named.username
},[file])
useEffect(()=>{
    createdata.categories = mycatego
},[mycatego])

const seturl = ()=>{
    seturls(require(`../images/${createdata.picture?createdata.picture:'blogimage.avif'}`))
    
}
const history = useNavigate()
const mychange = (e)=>{
    
    if(e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png'){
        window.alert('Send only images(png,jpeg)')
        return 
    }
    setfile(e.target.files[0])
}
const handleChange = (e)=>{
    console.log(e.target)
    setcatego(e.target.value)
}
const savepost = async ()=>{
    //Api
    const {username,title,description,categories} = createdata
    if(!username || !title || !description || !categories){
        window.alert('fill full post')
        return
    }
    const res =await fetch('http://localhost:8000/createpost',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        authorization:Generate()
      },
      body:JSON.stringify(createdata)
    }) 
    if(res.status === 200){
        history('/')
    }
}
// const url = createdata.picture?require(`../images/${createdata.picture}`):require('../images/blogimage.avif')
  return (
    <Contain>
        <Img src={urls} style={{marginTop:'67px',height:'40vh'}} alt='photo'/>
        <FormControl fullWidth style={{marginTop:'21px'}}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mycatego}
              label="Category"
              onChange={(e)=>handleChange(e)}
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'Movie'}>Movie</MenuItem>
              <MenuItem value={'Tech'}>Tech</MenuItem>
              <MenuItem value={'Sports'}>Sports</MenuItem>
              <MenuItem value={'Politics'}>Politics</MenuItem>
            </Select>
        </FormControl>
        <FormControl style={{marginTop:'12px',display:'flex',flexDirection:'row'}}>
            <label htmlFor='inputdata'>
                <AddCircle fontSize='large'/>
            </label>
            <input onChange={(e)=>mychange(e)}  id='inputdata' type='file' accept="image/*" style={{display:'none',flex:'1'}}></input>
            <InputBase onChange={(e)=>changein(e)} name='title' style={{flex:'1',margin:'0 10px 0 10px',fontSize:'23px'}} placeholder='Title'/>
            {
                imag?<Button variant='contained' style={{backgroundColor:'#7caedf'}}>Loding Photo</Button>:<Button variant='contained' onClick={seturl}>Submit Photo</Button>
            }
        </FormControl>
        <Textarea onChange={(e)=>changein(e)} name='description' minRows={5} placeholder='Tell Your Story....'></Textarea>
        <Button variant='contained' style={{width:'104px'}} onClick={savepost}>Publish</Button>
    </Contain>
  )
}

export default Createpost