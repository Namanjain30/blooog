import React, { useContext, useState } from "react";
import { TextField, Button, Box, styled } from "@mui/material";
import { Ncontext } from "../Context/Namecontext";
import { useNavigate } from "react-router-dom";




const Contain = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Contain2 = styled(Box)`
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  display: flex;
  flex-direction: column;
  width: 280px;
  align-items: center;
`;
const Contain3 = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 23px 0px 20px 0px;
  width: 273px;
`;
const Buttons = styled(Button)`
  text-transform: none;
  background-color: #f57e24;
  width: 273px;
  height: 48px;
`;
const Buttonss = styled(Button)`
  text-transform: none;
  width: 273px;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const Para = styled("p")({
  color: "#878786",
  textAlign:'center'
});
const Para2 = styled("p")({
  color: "red",
});

const Image = styled("img")({
  width: 100,

});

const TextFielda = styled(TextField)`
  margin: 10px 0 10px 0;
`;

const Login = ({setisautro}) => {
  const {setnamed} = useContext(Ncontext)

  const imageurl ="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [display, setdisplay] = useState("login");

  const [wro,setwro] = useState('true')

  const toggledata = () => {
    display === "login" ? setdisplay("create") : setdisplay("login");
  };

  const history = useNavigate()


  // signup detail

  const signdata = {
    name:'',
    username:'',
    password:''
  }
  
  const [sdata,setsdata] = useState(signdata)

  const signchange = (e)=>{
    setsdata({...sdata,[e.target.name]:e.target.value})
  }


  const signupf = async ()=>{
    const {name,username,password} = sdata
    if(name==='' || username==='' || password===''){
      window.alert('please fill fullform')
      return
    }
    const res = await fetch('http://localhost:8000/signup',{
      method :"POST",
      headers:{
          "Content-Type": "application/json"
      },
      body:JSON.stringify(sdata)
  })
  if(res.status === 200){
    toggledata('login')
    setsdata(signdata)
    setwro('true')

  }
  if(res.status === 501){
    setwro('false')
  }
  }

  
  // login detail

  const logindata={
    username:'',
    password:''
  }

  const [wrol,setwrol] = useState('true')

  const [ldata,setldata] = useState(logindata)

  const loginchange = (e)=>{
    setldata({...ldata,[e.target.name]:e.target.value})
  }

  const loginf = async ()=>{
    const {username,password} = ldata
    if(username==='' || password===''){
      window.alert('please fill fullform')
      return
    }
    const res =await fetch('http://localhost:8000/login',{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(ldata)
    })
    console.log(res.status)
    if(res.status ===200){
      const data = await res.json()
    sessionStorage.setItem('accesstoken',`${data.accesstoken}`)
    sessionStorage.setItem('referstoken',`${data.referstoken}`)
    setnamed({username:data.username,name:data.name})
    setisautro('true')
    setwrol('true')
    history('/')
    }
    else{
      console.log(wrol)
      setwrol('false')
    }
    
  }


  return (
    <Contain>
      <Contain2>
        <Image src={imageurl} alt="" />
        {display === "login" ? (
          <Box>
            <Contain3>
              <TextFielda id="standard-basic" label="Enter Username" variant="standard" onChange={(e)=>loginchange(e)} value={ldata.username} name="username"
              />
              <TextFielda id="standard-basic" label="Enter Password" variant="standard" onChange={(e)=>loginchange(e)} value={ldata.password} name="password"
              />
            </Contain3>
            {wrol==='false'?<Para2>Username or Password is Wrong</Para2>:<p></p>}
            <Buttons variant="contained" onClick={loginf}>Login</Buttons>
            <Para>OR</Para>
            <Buttonss onClick={toggledata}>Create an account</Buttonss>
          </Box>
        ) : (
          <Box>
            <Contain3>
              <TextFielda id="standard-basic" label="Enter Name" variant="standard" name="name" onChange={(e)=>signchange(e)} value={sdata.name}
              />
              <TextFielda id="standard-basic" label="Enter Username" variant="standard" name="username" onChange={(e)=>signchange(e)} value={sdata.username}
              />
              <TextFielda id="standard-basic" label="Enter Password" variant="standard" name="password" onChange={(e)=>signchange(e)} value={sdata.password}/>
            </Contain3>
            {wro==='false'?<Para2>Username already exist</Para2>:<p></p>}
            <Buttonss onClick={signupf}>Signup</Buttonss>
            <Para>OR</Para>
            <Buttons variant="contained" onClick={toggledata}>
              Aleardy have an account
            </Buttons>
          </Box>
        )}
      </Contain2>
    </Contain>
  );
};

export default Login;
