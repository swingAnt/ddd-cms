import React from 'react';
import { Table ,Dropdown} from 'antd';
import styles from './index.module.scss'
import { FileWordTwoTone ,FileExcelTwoTone} from '@ant-design/icons';
import folder from '@/assets/images/folder.png';

const getImg=(type)=>{
  let img;
  switch(type){
      case "1":
          img=<FileWordTwoTone className={styles.icon} />;
          break
          case "2":
              img=<FileExcelTwoTone className={styles.icon} />;
              break
          default:
              img=<img src={folder} alt="logo" className={styles.icon}/>;

  }
  return img
}
const getColumns=(props)=>{

  return [
    { title: 'name', dataIndex: 'name', key: 'name',
    render:(r,row) => {
      return <div>{getImg(row.type)}{r}</div>
    } },
    { title: 'description', dataIndex: 'description', key: 'description' },
    { title: '操作', dataIndex: 'action', key: 'action',
    render:(r,row) => {
      const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={()=>props.onEdit(r,'delete')}>
              删除
            </a>
          ),
        },
        
      ];
      return <div className={styles.buttonGroup}>
                <a onClick={()=>props.onEdit(row,'edit')}>编辑</a>
                <a onClick={()=>props.onEdit(row,'designClomns')}>表设计</a>
                <a onClick={()=>props.onEdit(row,'design')}>看板设计</a>
                <Dropdown menu={{ items }} placement="bottom" arrow>
            <span className={styles.button}  >
            ...
            </span>
      </Dropdown>

      </div>
    } },
  ];
} 



const App = (props) => (
  <>
  <div className={styles.driver}></div>
  <Table
    columns={getColumns(props)}
    rowSelection={{}}
    dataSource={props.list}
    pagination={false}
  /></>
);

export default App;