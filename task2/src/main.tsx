import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './redux/store.tsx'
import { Provider } from 'react-redux/es/exports'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
