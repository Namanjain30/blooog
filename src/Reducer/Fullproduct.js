const reducer = (state,action)=>{
    if(action.type === 'myproduct'){
        return {
            ...state,
            alldata:action.payload,
            filterdata:action.payload
        }
    }

    if(action.type === 'change'){
        let {filterdata} = state
        let chage = filterdata

        chage = chage.filter((curr)=> curr.categories === action.payload)
        return {
            ...state,
            alldata:chage,
        }
    }

    if(action.type === 'all'){
        let {filterdata} = state
        return {
            ...state,
            alldata:filterdata
        }
    }
}





export default reducer