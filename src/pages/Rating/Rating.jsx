import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Rating = () => {
    const {idRepairCenter,idReservation} = useParams()
    useEffect(()=>{
        console.log(idRepairCenter,idReservation);
    },[])
  return (
    <div>
      Rating
    </div>
  )
}

export default Rating
