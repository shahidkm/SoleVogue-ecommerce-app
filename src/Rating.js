// import React, { useState } from 'react'


// function Rating() {
//     let[state,setstate]=useState(0)
//     let divs=[1,2,3,4,5]
//   return (
//     <div>
//         <ul>
// {divs.map((item,index)=>(<li key={index}><div style={{backgroundColor:index<state?"green":"yellow",width:"100px",height:"100px"}} onClick={()=>setstate(index+1)}>{item}</div></li>))}

// </ul>

//     </div>
//   )
// }

// export default Rating

import React, { useState } from 'react'

function Rating() {
    let [sta,setsta]=useState(0)
let state=[1,2,3,4]

  return (
    <div>
        <ul>
{state.map((item,index)=>(<li key={index}><div style={{width:"100px",height:"100px",backgroundColor:index<sta?"green":"red",marginTop:"50px" }} onClick={()=>setsta(index+1)}>{item}</div></li>))}

</ul>
    </div>
  )
}

export default Rating