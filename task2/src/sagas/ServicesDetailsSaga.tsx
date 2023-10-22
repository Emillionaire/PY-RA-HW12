import { takeLatest, put, call } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect } from 'redux-saga/effects'
import { loadServiceDetailsRequest, loadServiceDetailsFailure, loadServiceDetailsSuccess } from '../redux/slices/serviceDetailsSlice'
import { loadServiceDetails } from '../api/services'
import type { ServiceDetailsType } from '../redux/slices/serviceDetailsSlice'
import { type PayloadAction } from '@reduxjs/toolkit'

function isServiceType (data: unknown): data is ServiceDetailsType {
  if (data instanceof Object) {
    return Object.keys(data).includes('id') &&
            Object.keys(data).includes('name') &&
            Object.keys(data).includes('content') &&
            Object.keys(data).includes('price')
  }
  return false
}

function * handleLoadServiceDetailsRequestSaga (action: PayloadAction<{ id: number }>): Generator<PutEffect | CallEffect> {
  try {
    const data = yield call(loadServiceDetails, action.payload.id)
    if (isServiceType(data)) {
      yield put(loadServiceDetailsSuccess({ service: data }))
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(loadServiceDetailsFailure({ error }))
    }
  }
}

function * watchLoadServiceDetailsRequestSaga (): Generator<ForkEffect> {
  yield takeLatest(loadServiceDetailsRequest.type, handleLoadServiceDetailsRequestSaga)
}

export { watchLoadServiceDetailsRequestSaga }
