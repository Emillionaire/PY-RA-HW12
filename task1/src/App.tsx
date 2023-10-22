import { Input, List, Space, Typography, Spin, Badge } from 'antd'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { changeSearchField, clearSkills } from './redux/skillsSlice'
import { useState } from 'react'
import type { ChangeEvent } from 'react'

function App (): JSX.Element {
  const state = useAppSelector(state => state.skills)
  const dispatch = useAppDispatch()
  const [text, setText] = useState<string>('')

  function onChange (e: ChangeEvent<HTMLInputElement>): void {
    const search = e.target.value.trim()
    setText(search)
    if (search === '') {
      dispatch(clearSkills())
    } else {
      dispatch(changeSearchField(e.target.value))
    }
  }

  const isSearchFieldEmpty = text.trim() === ''

  return (
    <Space direction='vertical'>
      <Space direction='horizontal'>
        <Input
          placeholder="input search text"
          value={text}
          allowClear
          size="large"
          style={{ width: 300 }}
          onChange={onChange}
        />
        {state.loading && <Spin tip="Loading" size="large"></Spin>}
      </Space>
      {isSearchFieldEmpty
        ? <Badge status='error' text='Type something to search' />
        : <List
          bordered
          dataSource={state.skills}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>{item.id}</Typography.Text> {item.name}
            </List.Item>
          )}
        />}
    </Space>
  )
}

export default App
