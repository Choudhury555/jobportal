import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import ProtectectedRoute from "./components/admin/ProtectectedRoute"

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/jobs',
    element:<Jobs />
  },
  {
    path:'/description/:id',
    element:<JobDescription />
  },
  {
    path:'/browse',
    element:<Browse />
  },
  {
    path:'/profile',
    element:<Profile />
  },

  //for ADMIN
  {
    path:'/admin/companies',
    element:<ProtectectedRoute><Companies /></ProtectectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectectedRoute><CompanyCreate /></ProtectectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectectedRoute><CompanySetup /></ProtectectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectectedRoute><AdminJobs /></ProtectectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectectedRoute><PostJob /></ProtectectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectectedRoute><Applicants /></ProtectectedRoute>
  }
])

function App() {

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
