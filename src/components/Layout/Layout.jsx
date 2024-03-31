
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
  return (
    <div >

    <Navbar/>
    {/*  */}
   
    <div style={{marginTop:'79px'}}>
    <Outlet/>
    </div>
    </div>
  )
}
