import React, { useContext, useEffect, useState } from 'react'
import { Button,Table, styled,TableHead,TableBody,TableCell,TableRow,Grid } from '@mui/material'
import { Cats } from './Cats'
import { Link, useSearchParams } from 'react-router-dom'
import Post from './Post'
import { Generate } from './Generate'
import { Allcontex } from '../Context/Allcontex'


const Tal = styled(Table)`
border:1px solid rgba(224,224,224,1)
`
const Linkk = styled(Link)`
color:inherit;
text-decoration: none;`



const Home = () => {
    // const [data,setdata] = useState([])
    const {clearall,alldata,mychangedata,allmydata} = useContext(Allcontex)
    useEffect(()=>{
        async function fetchdata(){
            const res = await fetch('http://localhost:8000/takedata',{
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                authorization:Generate()
              }
        })
        const dat = await res.json()
        if(res.status ===200){
            // setdata(dat)
            clearall(dat)
        }
        
        }
        fetchdata()
    },[])

    const [search] = useSearchParams()
    const category = search.get('category')
  return (
    <>
    <div style={{marginTop:'64px',display:'flex'}}>
        <img style={{width:'100vw',height:'43vh',margin:'auto',objectFit:'cover'}} src={require('../images/blogimage.avif')} alt="" />
    </div>
    <div>
        <Linkk to={`/create/?category=${category || ''}`}>
            <Button style={{margin:'11px'}} variant='contained'>Creact Blog</Button>
        </Linkk>
        <Grid container>
            <Grid item lg={2} s={2} xs={12}>
            <Tal>
            <TableHead>
                <TableRow>
                    <TableCell onClick={allmydata}>
                        <Linkk to='/'>
                        All Category
                        </Linkk>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {Cats.map((ele)=>{
                        return (
                        <TableRow>
                            <TableCell key={ele.id} onClick={()=>mychangedata(ele.type)}>
                                <Linkk to={`/?category=${ele.type}`} >
                                    {ele.type}
                                </Linkk>
                            </TableCell>
                        </TableRow>
                        )
                    })}
            </TableBody>
        </Tal>
            </Grid>
            <Grid container item lg={10} s={10} xs={12} style={{display: 'grid'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'}}>
                    {/* {
                        data?data.map((ele)=>{
                            return <Link to={`/detail/${ele._id}`} style={{textDecoration:'none',color:'inherit'}}><Post key={ele._id} data={ele}/></Link>
                            
                        }):"No data available"
                    } */}
                    {
                        alldata?alldata.map((ele)=>{
                            return <Link to={`/detail/${ele._id}`} style={{textDecoration:'none',color:'inherit'}}><Post key={ele._id} data={ele}/></Link>
                            
                        }):"No data available"
                    }
                </div>
            </Grid>
        </Grid>
    </div>
    </>
  )
}

export default Home