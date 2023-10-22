import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ServiceDetailsType = {
  id: number
  name: string
  price: number
  content: string
}

type ServiceDetialsState = {
  service: ServiceDetailsType
  loading: boolean
  error: string | null
}

const initialState: ServiceDetialsState = {
  service: { id: 0, name: '', price: 0, content: '' },
  loading: false,
  error: null
}

const servicesDetailsListSlice = createSlice({
  name: 'servicesDetails',
  initialState,
  reducers: {
    loadServiceDetailsRequest: (state, action: PayloadAction<{ id: number }>) => {
      state.loading = true
      state.error = null
    },
    loadServiceDetailsFailure: (state, action: PayloadAction<{ error: Error }>) => {
      const error = action.payload.error
      state.loading = false
      state.error = error.message
    },
    loadServiceDetailsSuccess: (state, action: PayloadAction<{ service: ServiceDetailsType }>) => {
      const service = action.payload.service
      state.service = service
      state.loading = false
      state.error = null
    }
  }
})

export const { loadServiceDetailsFailure, loadServiceDetailsRequest, loadServiceDetailsSuccess } = servicesDetailsListSlice.actions
export default servicesDetailsListSlice.reducer
export type { ServiceDetailsType }
