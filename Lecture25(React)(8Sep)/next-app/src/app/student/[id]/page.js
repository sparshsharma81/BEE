// export default ()=>{
//     return <>
//     <h1>Hello</h1>
//     </>

// }


// "use client"

// import { useRouter } from "next/router"
// export default ({params})=>{
//     return <>
//     <h1 style ={{color: "red", fontSize: "500px"}}> {params.id}</h1>
//     </>
// }
// //yaha pr params.id se hamne id ko access kiya hai jo ki url me diya gaya hai


export default()=>{
    const router = us eRouter();
    const {id} = router.query();
    return <>
    <h1 style ={{color: "red", fontSize: "500px"}}> {id}</h1>
    </>
}