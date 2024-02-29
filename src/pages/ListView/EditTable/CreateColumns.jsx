import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Drawer, Button, Form, Input, Space, Select, message } from 'antd';
import styles from './RenderContent.module.scss';

const App = (props) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log('Received values of form:', values);
    props.updateHeader(values.columns)
    setOpen(false);
    message.success('添加成功');
  };
  return (
    <>
      <a className={styles.addCol} onClick={showDrawer}>
        添加一列
      </a>
      {open && <Drawer title="新增表字段" onClose={onClose} open={open}>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          className={styles.draw}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.List name="columns">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'lable']}
                      rules={[
                        {
                          required: true,
                          message: '缺少 name',
                        },
                      ]}
                    >
                      <Input placeholder="名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      rules={[
                        {
                          required: true,
                          message: '缺少 key',
                        },
                      ]}
                    >
                      <Input placeholder="键值" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[
                        {
                          required: true,
                          message: '缺少 type',
                        },
                      ]}
                    >
                      <Select
                        placeholder="类型"
                        // style={{ width: 120 }}
                        //   onChange={handleChange}
                        options={[
                          { value: 'textArea', label: '文本' },
                          { value: 'number', label: '数字' },
                          { value: 'datePicker', label: '时间' },
                          { value: 'upload', label: '上传' },
                          { value: 'boolean', label: '开关' },
                        ]}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    增加一列
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item >
            <div className={styles.drawFooter}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button onClick={onClose}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>}
    </>
  );
};
export default App;