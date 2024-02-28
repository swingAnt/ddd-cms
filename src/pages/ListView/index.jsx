import React, { useState } from 'react'
import styles from './index.module.scss'
import { Button } from 'antd';
import { useMount } from 'ahooks';
import { DatabaseTwoTone, AppstoreTwoTone } from '@ant-design/icons';
import Table from '@/components/Table'
import Card from '@/components/Card'
import Seach from '@/components/Seach'
import {getUserInfo} from '@/api/index.jsx'
import Create from './CreateProject'
import Board from './Board'

import EditTable from './EditTable'

const data = [
    // {
    //   key: 2,
    //   name: 'Jim Green',
    //   age: 42,
    //   address: 'London No. 1 Lake Park',
    //   description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    // },
    {
      key: 3,
      name: '房产系统',
      description: 'This is house project',
      type:"1"
    },
    {
      key: 4,
      name: '财务系统',
      type:"2",
      description: 'This is money counting project',
    },
  ];
export default function ListView(props) {
  const [view, setView] = useState('1');
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTableVisible, setEditTableVisible] = useState(null);
  const [edit, setEdit] = useState(null);
  const onEditTable = (item,type) => {
    setEditTableVisible(type)
    setEdit(item)
  }

  useMount(() => {
         getUserInfo().then(user=>{
          setList(data)
        })
           
    })

    return editTableVisible==='edit'?
    <EditTable onEditTable={onEditTable}/>
    :editTableVisible==='design'?
    <Board  onEditTable={onEditTable}/>
    :<div className={styles.Container}>
        <Seach />
          <div className={styles.changeView}>
                <Button size='small' type={view === '1' ? 'primary' : "default"} className={styles.button} icon={<AppstoreTwoTone />} onClick={() => {
                    setView('1')
                }}>卡片</Button>
                <Button size='small' type={view === '2' ? 'primary' : "default"} className={styles.button} icon={<DatabaseTwoTone />} onClick={() => {
                    setView('2')
                }}>列表</Button>
                <div className={styles.create} ><Create list={list} updateList={setList}/></div>
            </div>
            {view === '1' ?
                <Card list={list} onEdit={onEditTable}/>
                : <Table list={list} onEdit={onEditTable}/>
            }  
    </div>
}