import { Card, Spin } from 'antd'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { ErrorComponent } from './ErrorComponent'
import { loadServiceDetailsRequest } from '../redux/slices/serviceDetailsSlice'
import { useParams } from 'react-router-dom'

function ServiceDetails (): JSX.Element {
  const { id } = useParams()
  const state = useAppSelector(state => state.serviceDetails)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadServiceDetailsRequest({ id: Number(id) }))
  }, [id, dispatch])

  return (
    state.error
      ? <ErrorComponent onRequestRetry={() => dispatch(loadServiceDetailsRequest({ id: Number(id) }))} />
      : state.loading
        ? <Spin size="large" />
        : <Card title={state.service.name}>
                    <p>Content: {state.service.content}</p>
                    <p>Price: {state.service.price}</p>
                </Card>
  )
}

export default ServiceDetails
