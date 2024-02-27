
import { Button, message, Upload, Progress, Image } from 'antd';
import React from 'react';
import { useReactive, } from 'ahooks'
import { UploadOutlined } from '@ant-design/icons';
import styles from './Upload.module.scss';

const UploadFile = (prop) => {
    const state = useReactive({
        percent: 0,
        isUploading: false,
        isNormal: true,
        name: null,
        size: null,
        type: ''
    })
    const props = {
        name: 'file',
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: file => {
            let unAceept;
            //   const nameParams=file.name?.split('.')||[]
            //   const type=nameParams[nameParams.length-1]||''
            //   if(prop.limit==='.ppt,.pptx,.doc,.docx,'){
            //     unAceept= prop.limit.indexOf(type.toLowerCase())===-1;
            //   } else{
            //     unAceept= prop.limit.indexOf(type.toLowerCase())===-1;
            //   }
            //   if (unAceept) {
            //     message.error('请上传指定类型的文件!');
            //     return false
            //   }
            if (file.name.match(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.\/\-\_]/g, '') || file.name.match(/^[/]/g, '') || file.name.substr(0, 1) == '/' || file.name.indexOf('//') !== -1 || file.name.length > 100) {
                message.error('文件名不能包含特殊字符!');
                return false
            }
            if (file.size / 1024 / 1024 > 50) {
                message.error('文件大小不要超过50M');
            }
            if (file.size / 1024 / 1024 <= 50) {
                state.isUploading = true;
                state.percent = 0;
                state.name = file.name;
                state.size = (file.size / 1024 / 1024).toFixed(2)
            }
            if (file.type.indexOf('image') > -1) {
                state.type = 'image';

            } else {
                state.type = '';

            }
            return file.size / 1024 / 1024 <= 50 ? true : false;
        },

        onChange(info) {
            if (info.file.percent > state.percent) {
                state.percent = info.file.percent;
            }
            if (info.file.response) {
                message.success('成功')
                state.isUploading = false;
                state.name = info.file.name;
            } else if (info.file.status === "done" && info.file.response && info.file.response.code) {

                message.info('失败')
            }
        },

        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    return <Upload {...props}
        // accept={prop.limit}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="text"
        // disabled={prop.disabled}
        maxCount={1}
        showUploadList={false}
        className={styles.fileList}
    >
        {state.name ? state.type === 'image' ? <Image
            width={100}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // 在这里添加预览图片的逻辑
            }} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        /> : <span onClick={() => { window.open(`http://localhost:8080/api/file/download/${state.name}`) }} className={styles.fileName} >{state.name}</span> : !state.isUploading ?
            <Button icon={<UploadOutlined />}>Upload</Button> :
            <Progress
                className={styles.fileProgress}
                percent={state.percent}
                steps={10}
            />
        }
        {state.name && <a className={styles.down} >替换</a>}
    </Upload>
};

export default UploadFile;
