import img1 from '../../Assents/OnBording/logo-1.svg'
import img2 from '../../Assents/OnBording/logo-2.svg'
import img3 from '../../Assents/OnBording/logo-3.svg'
import img4 from '../../Assents/OnBording/logo-4.svg'
import img5 from '../../Assents/OnBording/logo-5.svg'
import img6 from '../../Assents/OnBording/logo-6.svg'
import img7 from '../../Assents/OnBording/logo-7.svg'
import img8 from '../../Assents/OnBording/logo-8.svg'
import img9 from '../../Assents/OnBording/logo-9.svg'
import img10 from '../../Assents/OnBording/logo-10.svg'
import img11 from '../../Assents/OnBording/logo-11.svg'
import img12 from '../../Assents/OnBording/logo-12.svg'
import img13 from '../../Assents/OnBording/logo-13.svg'
import img14 from '../../Assents/OnBording/logo-14.svg'
import img15 from '../../Assents/OnBording/logo-15.svg'
import img16 from '../../Assents/OnBording/logo-16.svg'
import img17 from '../../Assents/OnBording/logo-17.svg'
import img18 from '../../Assents/OnBording/logo-18.svg'
import img19 from '../../Assents/OnBording/logo-19.svg'
import img20 from '../../Assents/OnBording/logo-20.svg'
import img21 from '../../Assents/OnBording/logo-21.svg'
import img22 from '../../Assents/OnBording/logo-22.svg'
import img23 from '../../Assents/OnBording/logo-23.svg'
import img24 from '../../Assents/OnBording/logo-24.svg'

const Brands = () => {
    const images = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21,img22,img23,img24]
  return (
    <div>
      <div className='row m-0 gy-4 p-0 d-flex align-items-center'>
      {images.map((el)=>{
       return <div className='col-md-1 col-3'>
            <img className='w-100' src={el} alt='img'/>
        </div>
      })}
       
        
      </div>
    </div>
  )
}

export default Brands
