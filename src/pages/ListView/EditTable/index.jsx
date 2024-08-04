import React, { useRef, useState } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditOutlined, SaveOutlined } from "@ant-design/icons"
import { Tabs, Input } from 'antd';
import RenderContent from './RenderContent'
import styles from './index.module.scss'
import { getUuid } from "@/utils";

const DraggableTabNode = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  };
  return React.cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};
const initialItems = [
  // {
  //   label: '订单表',
  //   list: [],

  //   key: '1',
  // },
  // {
  //   label: '历史表',
  //   list: [],

  //   key: '2',
  // },
  // {
  //   label: '流程表',
  //   list: [],

  //   key: '3',
  //   closable: false,
  // },
{
  label: '新增表',
  list: [],
  key: getUuid(),
}
];

const App = (props) => {
  const [activeKey, setActiveKey] = useState("");
  const [items, setItems] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: '新增表',
      list: [],
      key: getUuid(),
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
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  return (
    <div>
      <a
        className={styles.back}

        onClick={() => {
          props.onEditTable(null, null)
        }}>&lt;&lt; 返回</a>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        // destroyInactiveTabPane={true}
        items={items.map((_, i) => {
          console.log('_.key', _.key)
          console.log('activeKey', activeKey)

          return {
            label: <div style={{ width: 180 }}>{editFlag&&activeKey===_.key? <Input onChange={(e) => {
              items.forEach(l => {
                if (l.key === activeKey) {
                  l.label = e.target.value

                }
              })
              setItems([...items])
            }} width={150} value={_.label} />:_.label } {editFlag&&activeKey===_.key ? <SaveOutlined onClick={() => {
              setActiveKey(_.key)
              setEditFlag(false)
            }} className={styles.edit} /> : <EditOutlined onClick={() => {
              setActiveKey(_.key)
              setEditFlag(true)
            }} className={styles.edit} />}</div>,
            key: _.key,
            // children:activeKey===_.key&& RenderContent(_.list),
            children: <RenderContent list={_.list} />,

          };
        })}
        tabPosition={'left'}
        style={{ height: 400 }}
      // renderTabBar={(tabBarProps, DefaultTabBar) => (
      //   <DndContext sensors={[sensor]} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
      //     <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
      //       <DefaultTabBar {...tabBarProps}>
      //         {(node) => (
      //           <DraggableTabNode {...node.props} key={node.key}>
      //             {node}
      //           </DraggableTabNode>
      //         )}
      //       </DefaultTabBar>
      //     </SortableContext>
      //   </DndContext>
      // )}
      />
    </div>
  );
};
export default App;