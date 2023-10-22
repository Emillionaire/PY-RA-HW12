import { configureStore } from '@reduxjs/toolkit'
import skillsSlice from './skillsSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/saga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    skills: skillsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
