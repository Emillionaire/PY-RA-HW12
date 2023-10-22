import { takeLatest, put, call } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect } from 'redux-saga/effects'
import { loadServicesRequest, loadServicesFailure, loadServicesSuccess } from '../redux/slices/servicesListSlice'
import { loadServicesList } from '../api/services'
import type { ServiceType } from '../redux/slices/servicesListSlice'

function isServiceType (data: unknown): data is ServiceType[] {
  if (data instanceof Array) {
    return data.every(item => Object.keys(item).includes('id') &&
            Object.keys(item).includes('name') &&
            Object.keys(item).includes('price'))
  }
  return false
}

function * handleLoadServicesRequestSaga (): Generator<PutEffect | CallEffect> {
  try {
    const data = yield call(loadServicesList)
    if (isServiceType(data)) {
      yield put(loadServicesSuccess({ services: data }))
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(loadServicesFailure({ error }))
    }
  }
}

function * watchLoadServicesRequestSaga (): Generator<ForkEffect> {
  yield takeLatest(loadServicesRequest.type, handleLoadServicesRequestSaga)
}

export { watchLoadServicesRequestSaga }
