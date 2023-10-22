import { spawn } from 'redux-saga/effects'
import type { ForkEffect } from 'redux-saga/effects'
import { watchLoadServicesRequestSaga } from './servicesListSaga'
import { watchLoadServiceDetailsRequestSaga } from './ServicesDetailsSaga'

function * rootSaga (): Generator<ForkEffect> {
  yield spawn(watchLoadServicesRequestSaga)
  yield spawn(watchLoadServiceDetailsRequestSaga)
}

export default rootSaga
