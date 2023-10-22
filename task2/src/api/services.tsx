import type { ServiceType } from '../redux/slices/servicesListSlice'
import type { ServiceDetailsType } from '../redux/slices/serviceDetailsSlice'

async function loadServicesList (): Promise<ServiceType[]> {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + 'services')
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data: ServiceType[] = await response.json()
  return data
}

async function loadServiceDetails (id: number): Promise<ServiceDetailsType> {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + 'services/' + id)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data: ServiceDetailsType = await response.json()
  return data
}

export { loadServicesList, loadServiceDetails }
