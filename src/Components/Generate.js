export const Generate = ()=>{
    return sessionStorage.getItem('accesstoken')
}

export const Cutt = (str,limit)=>{
    return str.length>limit?str.substring(0,limit)+'...':str
}