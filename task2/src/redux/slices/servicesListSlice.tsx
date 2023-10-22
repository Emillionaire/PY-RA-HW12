import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ServiceType = {
  id: number
  name: string
  price: number
}

type ServicesState = {
  services: ServiceType[]
  loading: boolean
  error: string | null
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null
}

const servicesListSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    loadServicesRequest: (state) => {
      state.loading = true
      state.error = null
    },
    loadServicesFailure: (state, action: PayloadAction<{ error: Error }>) => {
      const error = action.payload.error
      state.loading = false
      state.error = error.message
    },
    loadServicesSuccess: (state, action: PayloadAction<{ services: ServiceType[] }>) => {
      const services = action.payload.services
      state.services = services
      state.loading = false
      state.error = null
    }
  }
})

export const { loadServicesFailure, loadServicesRequest, loadServicesSuccess } = servicesListSlice.actions
export default servicesListSlice.reducer
export type { ServiceType }
