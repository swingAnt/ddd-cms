import React, { useState } from 'react';
import { Modal,Button, Checkbox, Form, Input,message } from 'antd';
import styles from './index.module.scss';
import { getUuid } from "@/utils/index";

const { TextArea } = Input;
const formRender=(objs)=>{
    const onFinish = (values) => {
        console.log('Success:', values);
        objs.onOk({
            ...values,
            key:getUuid(),
            type:"2"
        })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 600,
          paddingTop:20
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your description!',
            },
          ]}
        >
          <TextArea
      showCount
      maxLength={100}
      placeholder="Please input your descriptio"
      style={{
        height: 120,
        resize: 'none',
      }}
    />
        </Form.Item>
        <Form.Item
        className={styles.buttonGroup}
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
            <div className={styles.footer}>
          <Button type="primary" htmlType="submit" 
        //   onClick={()=>{
        //     objs.onOk()
        //   }}
          >
            保存
          </Button>
          <Button onClick={()=>{
            objs.onCancel()
          }}>
            取消
          </Button>
          </div>
        </Form.Item>
      </Form>
    )
}
const CreateProject = (props) => {
    const { updateList,list }=props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (obj) => {
    props.updateList([...list, obj])
    message.success('保存成功')
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        新增项目
      </Button>
     {isModalOpen&& <Modal title="新增项目" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
      {formRender({
       onOk: handleOk,
       onCancel: handleCancel
      })}
      </Modal>}
    </>
  );
};
export default CreateProject;