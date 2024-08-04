// import React from 'react';
// import { Table } from 'antd';
// const columns = [
//   {
//     title: 'Full Name',
//     width: 100,
//     dataIndex: 'name',
//     key: 'name',
//     fixed: 'left',
//   },
//   {
//     title: 'Age',
//     width: 100,
//     dataIndex: 'age',
//     key: 'age',
//     fixed: 'left',
//   },
//   {
//     title: 'Column 1',
//     dataIndex: 'address',
//     key: '1',
//     width: 150,
//   },
//   {
//     title: 'Column 2',
//     dataIndex: 'address',
//     key: '2',
//     width: 150,
//   },
//   {
//     title: 'Column 3',
//     dataIndex: 'address',
//     key: '3',
//     width: 150,
//   },
//   {
//     title: 'Column 4',
//     dataIndex: 'address',
//     key: '4',
//     width: 150,
//   },
//   {
//     title: 'Column 5',
//     dataIndex: 'address',
//     key: '5',
//     width: 150,
//   },
//   {
//     title: 'Column 6',
//     dataIndex: 'address',
//     key: '6',
//     width: 150,
//   },
//   {
//     title: 'Column 7',
//     dataIndex: 'address',
//     key: '7',
//     width: 150,
//   },
//   {
//     title: 'Column 8',
//     dataIndex: 'address',
//     key: '8',
//   },
//   {
//     title: 'Action',
//     key: 'operation',
//     fixed: 'right',
//     width: 100,
//     render: () => <a>action</a>,
//   },
// ];
// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
// const RenderContent = (props) => (

//   <Table
//     columns={columns}
//     dataSource={data}
//     scroll={{
//       x: 1500,
//       y: 300,
//     }}
//   />
// );
// export default RenderContent;


import React, { useState, useEffect, } from 'react';
import { Input, DatePicker, InputNumber ,Switch} from 'antd';
import styles from './RenderContent.module.scss';
import { getUuid } from '../../../utils';
import Upload from './Upload'
import CreateColumns from './CreateColumns'

const { TextArea } = Input;
const initHeader = [
  // {
  //   lable: '姓名',
  //   key: 'name',
  //   type: 'textArea'
  // },
  // {
  //   lable: '年龄',
  //   key: 'age',
  //   type: 'number'


  // },
  // {
  //   lable: '描述',
  //   key: 'desc',
  //   type: 'textArea'

  // },
]
const initBody = [{
  id: "1",
  list: [
    {
      lable: '1-1',
      key: 'name',
      id: '1-1'
    },
    {
      id: '1-2',
      lable: '1-2',

      key: 'age'
    },
    {
      id: '1-3',
      lable: '1-2',

      key: 'desc'

    },
  ]
}, {
  id: "2",
  list: [
    {
      lable: '2-1',
      id: '2-1',
      key: 'name',
    },
    {
      lable: '2-2',
      id: '2-2',

      key: 'age'

    },
    {
      lable: '2-3',
      id: '2-3',

      key: 'desc'

    },
  ]
}, {
  id: "3",
  list: [
    {
      lable: '3-1',
      id: '3-1',

      key: 'name',
    },
    {
      lable: '3-2',
      id: '3-2',

      key: 'age'

    },
    {
      lable: '3-3',
      id: '3-3',

      key: 'desc'

    },
  ]
},]
const renderView = ({ id, key, type, value, updateList }) => {
  let view;
  switch (type) {
    case 'datePicker':
      view =   <DatePicker value={value} onChange={(date, dateString) => {
        console.log(date, dateString);
        updateList(id, key, date)
      }} />
      break;
    case 'number':
      view = <InputNumber value={value} onChange={(e) => {
        updateList(id, key, e)
      }} />
      break;
    case 'textArea':
      view = <TextArea value={value} onChange={(e) => {
        updateList(id, key, e.target.value)
      }}
        autoSize={{ minRows: 1, maxRows: 4 }}

      />

      break;
      case 'upload':
      view =   <Upload />
      break;
      case 'boolean':
        view =  <Switch  value={value} onChange={(e) => {
          updateList(id, key, e)
        }}/>
        break;
        default:
          break;

  }
  return view
}
const renderHeader = (data) => {
  return data.map((item) => {
    return <div className={styles.header}>{item.lable}</div>
  })
}
const renderBody = (data, header, updateList) => {
  return data.map((item) => {
    return header.map(l => {
      const target = item.list.filter(z => l.key === z.key)[0] || {}
      return <div className={styles.item} key={target.id}>{renderView({ id: item.id, key: l.key, type: l.type, value: target.lable, updateList })}</div>
    })
  })
}

const RenderContent = (props) => {
  const [header, setHeader] = useState([])
  const [body, setBody] = useState([])

  useEffect(() => {
    setHeader(initHeader)
    setBody([])
  }, [])


  const updateList = (id, key, value) => {
    body.forEach(l => {
      if (l.id === id) {
        l.list.forEach(l2 => {
          if (l2.key === key) {
            l2.lable = value
          }
        })

      }
    })
    setBody([...body])

  }
  const updateHeader = (data) => {
    setHeader([...header, ...data])
  }
  console.log('body',body)
  console.log('header',header)

  return <div>
    <div className={styles.gridTableButtons}>
      <div className={styles.addRow}>

        <CreateColumns updateHeader={updateHeader} />
      </div>
      <a className={styles.addCol} onClick={() => {
        setBody([...body, {
          id: getUuid(),
          list: []
        }])
      }}>
        添加一行
      </a>
    </div>
    <div className={styles.gridTable} style={{ gridTemplateColumns: `repeat(${header?.length}, 1fr)` }}>
      {renderHeader(header)}
      {renderBody(body, header, updateList)}

    </div>
  </div>
};
export default RenderContent;