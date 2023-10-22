import { List, Spin } from "antd"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { loadServicesRequest } from "../redux/slices/servicesListSlice"
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { ErrorComponent } from "./ErrorComponent"

function Main() {
    const state = useAppSelector(state => state.servicesList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadServicesRequest())
    }, [])

    return (
        state.error
            ? <ErrorComponent onRequestRetry={() => dispatch(loadServicesRequest())}/>
            : state.loading
                ? <Spin size="large" />
                : <List
                    size="large"
                    bordered
                    dataSource={state.services}
                    renderItem={(item) => <List.Item><Link to={`${item.id}/details`}>{item.id} {item.name} {item.price}</Link></List.Item>}
                />
    )
}

export default Main
