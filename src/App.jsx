
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { ConfigStore } from './store/store'
import { Provider } from 'react-redux'

function App() {
  
  let router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/Register', element: <Register /> },
  ])
  return (
    <>
     <Provider store={ConfigStore}>
       <RouterProvider router={router} />
      </Provider>
  
     
    </>
  )
}

export default App
