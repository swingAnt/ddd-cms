import React from 'react';
import { Cascader } from 'antd';
const options = [
    {
        label: '人员项目',
        value: 'bamboo',
        children: [
          {
            label: '姓名表',
            value: 'little',
            children: [
              {
                label: '张三',
                value: 'fish',
                
              },
              {
                label: '李四',
                value: 'cards',
              },
              {
                label: '王五',
                value: 'bird',
              },
            ],
          },
          {
            label: '版本表',
            value: 'little1',
            children: [
              {
                label: '版本1.01',
                value: 'fish1',
                
              },
              {
                label: '版本1.02',
                value: 'cards1',
              },
              {
                label: '版本1.03',
                value: 'bird1',
              },
            ],
          },
        ],
      },
  {
    label: '财务项目',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
 
];
const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <Cascader
    style={{
      width: '150px',
    }}
    options={options}
    onChange={onChange}
    multiple
    maxTagCount="responsive"
  />
);
export default App;