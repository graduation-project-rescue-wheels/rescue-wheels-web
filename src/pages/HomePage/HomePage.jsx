// import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { GetAllRepairCenters } from "../../store/RepairCenterSlice"
import RepairCenterComponent from "../../components/RepairCenterComponent/RepairCenterComponent"

const HomePage = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  // const {AddRepaircenterData} = useSelector((x)=>x.RepairCenterData)
  const [repairCenterData,setRepairCenterData] = useState([])
  const fetchRepairCeneterData = async () => {
    console.log("kjdfhg");
    const res = await dispatch(GetAllRepairCenters())
    console.log(res.payload.data);
    if(res.payload?.success){
      setRepairCenterData(res.payload.data);
      console.log("Repair center data fetched successfully:", repairCenterData);
    }
    
  }
  useEffect(()=>{
    fetchRepairCeneterData()
  },[])
  return (
    <div>
      <div className="container mt-5 ">
      <h2 className="fw-bold">Repair Centers</h2>
        <div className="row gy-3">
          {repairCenterData?.map((el)=>{
            return <div key={el._id}  className="col-md-3">
          <RepairCenterComponent id={el._id} name= {el.name} description={el.description} image={el.Image?.secure_url}/>
          </div>
          })}
        
         
        </div>
      </div>
    </div>
  )
}

export default HomePage
