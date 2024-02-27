import React from 'react'
import {
  HashRouter as Router,
} from 'react-router-dom'
import styles from './App.module.scss'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
const MainView = React.lazy(() => import('@/router/index'))
export default function App() {

  console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV)

  return (
    <ConfigProvider locale={zhCN}>

      <div className={styles.app}>
        
        <Router >
            <MainView />
        </Router>
      </div>
</ConfigProvider>
  )
}
