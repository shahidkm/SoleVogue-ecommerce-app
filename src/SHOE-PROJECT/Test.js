import axios from 'axios'
import React, { useEffect ,useState} from 'react'

function Test() {
let [user,setUser]=useState([])
let [total,settotal]=useState(null)
    useEffect((()=>{
        
        let fetch=async()=>{
            try{
        let response= await axios.get("http://localhost:3008/users")
        setUser(response.data)
 }
catch(error){
    console.log(error);
    
}} 
fetch(

)}),[])

let datafromuser=user.reduce((accu,user)=>{
    if(user.orders && user.orders>0){
        let totals=user.orders.reduce((sum,order)=>
            order.totalPrice+sum
        )
    }
    settotal(totals)
})

  return (
    <div>



    </div>
  )
}

export default Test