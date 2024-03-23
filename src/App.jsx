
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


function App() {

  let router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/Register', element: <Register /> },
    { path: '/HomePage', element: <HomePage /> },
    { path: '/Settings', element: <Settings /> },
    { path: '/Vehicles', element: <Vehicles /> },
  ])

  return (
    <>
      <Provider store={ConfigStore}>
        <PersistGate loading={null} persistor={persistor} >
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>


    </>
  )
}

export default App
