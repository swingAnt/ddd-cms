import React, { useRef, useState } from 'react';
import { Tabs,Table } from 'antd';
import RenderContent from './RenderContent'
const initialItems = [
  {
    label: '订单表',
    list:[],

    key: '1',
  },
  {
    label: '历史表',
    list:[],

    key: '2',
  },
  {
    label: '流程表',
    list:[],

    key: '3',
    closable: false,
  },
];

const App = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      list: [],
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      // destroyInactiveTabPane={true}
      items={items.map((_, i) => {
        return {
          label: _.label,
          key: _.key,
          // children:activeKey===_.key&& RenderContent(_.list),
          children:<RenderContent list={_.list}/>,

        };
      })}
      tabPosition={'left'}
      style={{ height: 400 }}

    />
  );
};
export default App;