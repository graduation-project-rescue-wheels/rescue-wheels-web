import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { ConfigStore, persistor } from './store/store'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage/HomePage'
import { PersistGate } from "redux-persist/integration/react"
import Settings from './pages/Settings/Settings';
import Vehicles from './pages/Vehicles/Vehicles';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import Layout from './components/Layout/Layout'
import AdminLayout from "./components/AdminLayout/AdminLayout";
import RepairCenterShow from './pages/RepairCenterShow/RepairCenterShow'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Auth from './pages/Admin/Auth/Auth'
import RepairCenters from './pages/Admin/RepairCenters/RepairCenters'
import Requests from './pages/Admin/Requests/Requests'
import RepairCenterProfile from "./pages/Admin/RepairCenterProfile/RepairCenterProfile";
import Emergency from './pages/Emergency/Emergency'
// import Technician from './pages/Technician/Technician'
import History from './pages/History/History'
import LandingPage from './pages/LandingPage/LandingPage'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import OTP from './pages/ForgetPassword/Otp'
import ResetPassword from './pages/ForgetPassword/ResetPassword'
import RepairCenter from './pages/Careers/RepairCenter'
import TechnicianNew from './pages/Careers/TechnicianNew'
import Technician from './pages/Technician/Technician'

function App() {
  let router = createBrowserRouter([
    // { path: '/', element: <Login /> },
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signUp", element: <Register /> },
    {path:'/ForgetPassword',element:<ForgetPassword/>},
    {path:'/OTP',element:<OTP/>},
    {path:'/ResetPassword',element:<ResetPassword/>},
    { path: "/VerifyEmail/:userToken", element: <VerifyEmail /> },
    {path:"/RepairCenter",element:<RepairCenter/>},
    {path:"/TechnicianNew",element:<TechnicianNew/>},
    {
      path: "/",
      element: <Layout />,
      children: [
        
        { path: "/HomePage", element: <HomePage /> },
        { path: "/Settings", element: <Settings /> },
        { path: "/Vehicles", element: <Vehicles /> },
        { path: "RepairCenterShow/:id", element: <RepairCenterShow /> },
        { path: "Emergency", element: <Emergency /> },
        { path: "Technician", element: <Technician /> },
        { path: "History", element: <History /> },
        { path: "Rating/:idRepairCenter/:idReservation", element: <History /> },


        
      ]
    },
    {
      path: "/Admin",
      element: <AdminLayout />,
      children: [
        { path: "/Admin/Dashboard", element: <Dashboard /> },
        { path: "/Admin/Auth", element: <Auth /> },
        { path: "/Admin/RepairCenters", element: <RepairCenters /> },
        { path: "/Admin/Requests", element: <Requests /> },
        { path: "/Admin/RepairCenter/:id", element: <RepairCenterProfile /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={ConfigStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
