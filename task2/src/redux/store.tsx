import { configureStore } from '@reduxjs/toolkit'
import servicesListSlice from './slices/servicesListSlice'
import serviceDetailsSlice from './slices/serviceDetailsSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    servicesList: servicesListSlice,
    serviceDetails: serviceDetailsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
