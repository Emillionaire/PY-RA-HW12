import { spawn, debounce, takeLatest, retry, put } from 'redux-saga/effects'
import { changeSearchField, searchSkillsSuccess, searchSkillsFailure, searchSkillsRequest } from '../redux/skillsSlice'
import { searchSkills } from '../api/searchSkills'
import type { SkillsType } from '../redux/skillsSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PutEffect, CallEffect, ForkEffect } from '@redux-saga/core/effects'

type HandleSearchSkillSagaType = Generator<PutEffect | CallEffect>

function isSkillsDataType (data: unknown): data is SkillsType[] {
  if (data instanceof Array) {
    return data.every(item => Object.keys(item).includes('id') && Object.keys(item).includes('name'))
  }
  return false
}

function * handleChangeSearchSaga (action: PayloadAction<string>): Generator<PutEffect> {
  yield put(searchSkillsRequest(action.payload))
}

function * handleSearchSkillSaga (action: PayloadAction<string>): HandleSearchSkillSagaType {
  try {
    const data = yield retry(3, 3000, searchSkills, action.payload)
    if (isSkillsDataType(data)) {
      yield put(searchSkillsSuccess(data))
    } else {
      throw Error('Wrong data type')
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(searchSkillsFailure(err.message))
    }
  }
}

function * watchChangeSearchSaga (): Generator<ForkEffect> {
  yield debounce(300, changeSearchField.type, handleChangeSearchSaga)
}

function * watchSearchSkillsSaga (): Generator<ForkEffect> {
  yield takeLatest(searchSkillsRequest.type, handleSearchSkillSaga)
}

function * rootSaga (): Generator<ForkEffect> {
  yield spawn(watchChangeSearchSaga)
  yield spawn(watchSearchSkillsSaga)
}

export default rootSaga
