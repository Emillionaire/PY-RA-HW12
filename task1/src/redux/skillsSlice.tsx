import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type SkillsType = {
  id: number
  name: string
}

type SkillsState = {
  skills: SkillsType[]
  loading: boolean
  error: string | null
  search: string
}

const initialState: SkillsState = {
  skills: [],
  loading: false,
  error: null,
  search: ''
}

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    searchSkillsRequest: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.search = action.payload
      state.error = null
    },
    searchSkillsFailure: (state, action: PayloadAction<string>) => {
      const error = action.payload
      state.loading = false
      state.error = error
    },
    searchSkillsSuccess: (state, action: PayloadAction<SkillsType[]>) => {
      if (state.search === '') {
        state.skills = []
      } else {
        const skills = action.payload
        state.skills = skills
      }
      state.loading = false
      state.error = null
    },
    clearSkills: (state) => {
      state.skills = []
    },
    changeSearchField: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }
  }
})

export const { changeSearchField, searchSkillsFailure, searchSkillsRequest, clearSkills, searchSkillsSuccess } = skillsSlice.actions
export type { SkillsState, SkillsType }
export default skillsSlice.reducer
