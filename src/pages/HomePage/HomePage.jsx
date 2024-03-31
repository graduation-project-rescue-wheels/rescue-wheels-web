import { useMemo } from "react";
import img from "../../assets/5098287-Photoroom.png-Photoroom.png"
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import "./HomePage.css"

const HomePage = () => {
  const user = useSelector(state => state.AuthData.UserData);
  const username = `${user.firstName} ${user.lastName}`;
  const isFirstHalfOfDay = useMemo(() => new Date().getHours() < 12, [])

  return (
    <>
      

      <div className="heroSection ps-5 pe-5" style={{ backgroundColor: "white", marginTop: "100px" }}>
        <div className="d-flex justify-content-center align-items-center flex-column w-50">
          {
            user.length !== 0 && (isFirstHalfOfDay ?
              <h1>
                Good morning, {username}
              </h1>
              :
              <h1>
                Good afternoon, {username}
              </h1>
            )}
          <div className="form-control border-0">
            <Input
              text={"Enter Location"}
              type='location'
              name='location'
              id='location'
            />
            <button className="btn" style={{ backgroundColor: "#e48700", color: "white" }}>
              See the nearest repair center
            </button>
          </div>
        </div>
        <div className="img d-flex justify-content-center align-items-center flex-column" style={{ width: "50%" }}>
          <img src={img} alt="" style={{ width: "100%" }} />
        </div>
      </div>
    </>
  )
}

export default HomePage
