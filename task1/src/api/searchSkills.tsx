import type { SkillsType } from '../redux/skillsSlice'

async function searchSkills (search: string): Promise<SkillsType[]> {
  const params = new URLSearchParams({ q: search }).toString()
  const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}?${params}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data: SkillsType[] = await response.json()
  return data
}

export { searchSkills }
