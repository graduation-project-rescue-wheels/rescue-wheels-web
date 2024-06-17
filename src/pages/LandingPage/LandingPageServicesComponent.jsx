
import arrow from '../../Assents/OnBording/next.png'
import arrow2 from '../../Assents/OnBording/next (1).png'
const LandingPageServicesComponent = ({img,text,bgColor,color,bgText,colo2}) => {
  return (
    <div>
      <div style={{boxShadow:'0px 5px 0px #2d2d30'}} className={`py-4 ${bgColor}  border-dark d-flex align-items-center rounded-5 border border-2`}>
        
        
        <div className={`text-center  ${colo2} bg mt-3 ps-5`}>
        <h5 className={`${bgText} ${color} rounded-pill px-4`}>{text}</h5>
        <p className="pt-5 my-3 ">
        {(colo2==='text-white')?
            <img className='me-3' src={arrow2} alt=''/>
            :<img className='me-3' src={arrow} alt=''/>}
            
            Learn more
        </p>
        </div>
        <div className="w-50 ms-auto text-end pe-5 d-flex ">
        <img className='w ms-auto rounded-4' src={img} alt=""/>
      
        </div>
      </div>
    </div>
  )
}

export default LandingPageServicesComponent
