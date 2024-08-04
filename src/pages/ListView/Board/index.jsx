import React, { useState } from 'react'
import styles from './index.module.scss'
// import BoardCavas from '@/components/BoardCavas'
import DragTool from './components/left'
import DropBoard1 from './components/right'
import DropBoard2 from './components/free'
import DropBoard3 from './components/row'
import TableColumns from './components/tableColumns'

export default function ListView(props) {
  const boardMap = [DropBoard1, DropBoard2, DropBoard3]
  const [mode, setMode] = useState(2)
  const [themeType, setThemeType] = useState('wonderland')
  const themeMap = ['wonder', 'vintage', 'dark',]

  const DropBoard = boardMap[mode]
  return <div className={styles.Box}>
    <a
      className={styles.back}
      onClick={() => {
        props.onEditTable(null, null)
      }}>&lt;&lt; 返回</a>




    <div className={styles.Container}>

      <div className={styles.left}>

        {/* <div className={styles.layout}>
          <span className={styles.title}>
            布局:
          </span>

          <a
            style={mode == 0 ? { color: 'red' } : {}}
            onClick={() => {
              setMode(0)
            }}>网格</a>
          <a
            style={mode == 1 ? { color: 'red' } : {}}

            onClick={() => {
              setMode(1)
            }}>自由</a>
          <a
            style={mode == 2 ? { color: 'red' } : {}}
            onClick={() => {
              setMode(2)
            }}>流式</a>
        </div> */}
        <div className={styles.theme}>
          <span className={styles.title}>主题:</span>
          {
            themeMap.map(l => {
              return <a style={themeType === l ? { color: 'red' } : {}} onClick={() => setThemeType(l)}>
                {l}

              </a>
            })
          }
        </div>
        <div className={styles.theme}>
          <span className={styles.title}>表字段:</span>
          <TableColumns />
        </div>

        类型:
        <DragTool />

      </div>
      <div className={styles.right}>
        <DropBoard themeType={themeType} updateView={props.updateView}/>


      </div>

    </div>
  </div>

}