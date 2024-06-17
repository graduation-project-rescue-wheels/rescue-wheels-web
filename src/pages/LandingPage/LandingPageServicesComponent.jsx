
import arrow from '../../Assents/OnBording/next (2).png'
import arrow2 from '../../Assents/OnBording/next (1).png'
const LandingPageServicesComponent = ({img,text,bgColor,color,bgText,colo2}) => {
  return (
    <div>
      <div style={{boxShadow:'0px 5px 0px #362e93',backgroundColor:bgColor==="bg-dark"?"#362e93":bgColor,border :'2px solid #362e93'}} className={`py-4   d-flex align-items-center rounded-5 `}>
        
        
        <div className={`text-centerbg mt-3 ps-5`} style={{color:colo2==="text-dark"?"#362e93":'white'}}>
        <h5 className={` rounded-pill px-4`} style={{color:color==="text-dark"?"#362e93":'white' , backgroundColor:bgText==="bg-dark"?"#362e93":'white'}}>{text}</h5>
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
