import { Button, Typography } from 'antd'

type ErrorComponentProps = {
  onRequestRetry: () => void
}

function ErrorComponent ({ onRequestRetry }: ErrorComponentProps): JSX.Element {
  return (
        <>
            <Typography.Text type="danger" style={{ marginRight: 5 }}>Что-то пошло не так</Typography.Text>
            <Button onClick={onRequestRetry} type="primary" danger>Повторить запрос</Button>
        </>
  )
}

export { ErrorComponent }
