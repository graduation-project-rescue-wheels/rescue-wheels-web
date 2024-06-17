import style from '../../Assents/Style/Homepage.module.css'
const CustomTitle = ({title}) => {
  return (
    <div className={[style.font,"position-relative mb-5 w-100"].join(' ')}>
    <svg width="170" height="80" viewBox="0 0 169 47" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M57.8455 3.31715C49.9127 5.1154 41.855 6.61317 34.0194 8.78792C24.9458 11.3065 -13.4603 24.3073 11.7019 34.7359C14.0596 35.7127 16.5882 36.3148 19.063 36.9142C23.5066 37.9906 27.9135 39.1411 32.4343 39.8625C69.607 45.7942 108.416 44.5649 145.828 42.5558" stroke="#362e93" stroke-width="5.43899" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="70%" y="10%" font-size="30" fill="rgba(31, 42, 68, 1)" dominant-baseline="middle" text-anchor="middle"> {title} </text>
</svg>      
    </div>
  )
}

export default CustomTitle
