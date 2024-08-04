
import React, { useState} from 'react'
import styles from './index.module.scss'
import { FileWordTwoTone,CheckCircleTwoTone ,FileExcelTwoTone} from '@ant-design/icons';
import {Col ,Dropdown} from 'antd'
import folder from '@/assets/images/folder.png';

export default function CardView(props) {
    const {span,r,key, onDelete, onEdit, onAbilityQuality, } = props;
    const [hover, onHover] = useState(false);
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={()=>props.onEdit(r,'preview')}>
              预览
            </a>
          ),
        },
        {
            key: '2',
            label: (
              <a target="_blank" rel="noopener noreferrer" onClick={()=>props.onEdit(r,'delete')}>
                删除
              </a>
            ),
          },
      ];
    const getImg=()=>{
        let img;
        switch(r.type){
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
    return <Col span={span} key={key} 
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    >
    <div className={styles.rowCardBox}>
    <CheckCircleTwoTone className={styles.publishFlag} twoToneColor="#52c41a" />
        <div className={styles.content}> {getImg()}</div>
        <div className={styles.footer}>
            <div className={styles.title} title={r.levelGrade}>{
                r.name
            }</div>
        </div>
        {hover&&<div className={styles.buttonGroup}>
        <span className={styles.button}  onClick={()=>props.onEdit(r,'edit')} >
            编辑
            </span>
            <span className={styles.button} onClick={()=>props.onEdit(r,'designClomns')} >
            表设计
            </span>
            <span className={styles.button} onClick={()=>props.onEdit(r,'design')} >
            看板设计
            </span>
       
            <Dropdown menu={{ items }} placement="bottom" arrow>
            <span className={styles.button}  >
            ...
            </span>
      </Dropdown>
        {/* <span className={styles.button}  onClick={()=>onDelete(r)}>
            删除
            </span> */}
          
        </div>}
    </div>
</Col>
}
