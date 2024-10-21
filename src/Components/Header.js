import { AppBar,Toolbar,styled } from "@mui/material";
import { Link } from "react-router-dom";
import React from 'react'

const Container = styled(AppBar)`
background-color: #a98352;
    display: flex;
    align-items: center;
`

const Component = styled(Toolbar)`
width: 358px;
    display: flex;
    justify-content: space-around;
`

const Lin = styled(Link)`
text-decoration: none;
    color: white;
`
const changese = ()=>{
    sessionStorage.removeItem('accesstoken')
    sessionStorage.removeItem('referstoken')
}

const Header = () => {
  return (
    <div>
        <Container>
        <Component>
            <Lin to='/'>HOME</Lin>
            {/* <Lin to='/about'>ABOUT</Lin> */}
            <Lin to='/create'>CREATE</Lin>
            <Lin onClick={changese} to='/login'>LOGOUT</Lin>
        </Component>
    </Container>
    </div>
  )
}

export default Header