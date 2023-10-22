import { createBrowserRouter } from 'react-router-dom'
import Main from './components/Main'
import ServiceDetails from './components/ServiceDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: ':id/details',
    element: <ServiceDetails />
  }
])

export default router
