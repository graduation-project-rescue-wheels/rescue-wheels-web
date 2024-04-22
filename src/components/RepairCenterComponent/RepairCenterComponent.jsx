import { useNavigate } from "react-router-dom";
import './RepairCenterComponent.css'
// eslint-disable-next-line react/prop-types
const RepairCenterComponent = ({id,name,description,image}) => {

  const navigate = useNavigate()
  return (
    <div >
      <div className="bg-white componenthover text-center align-items-center rounded-4 p-4" >
      <img src={image} className="" style={{width:'100%'}} alt="repair center w-100" />

      <div className="text-start">
        <h6 className="mt-2 fw-bold" >{name}</h6>
      </div>
      <p className="ms-3 text-secondary text-start" style={{fontSize:'12px'}}>{description}</p>

      <div className="text-start" style={{cursor:'pointer'}}>
        <h6 className="mt-2 fw-bold" onClick={()=>navigate(`/RepairCenterShow/${id}`)} >View more {">"} </h6>
      </div>

      </div>
    </div>
  )
}

export default RepairCenterComponent
