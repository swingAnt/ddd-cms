import { Menu } from 'antd';
import React from 'react';
import { WindowsFilled, BankFilled } from '@ant-design/icons';
// 高阶组件，包裹useNavigate()功能
import WidthUseNavigate from './widthUseNavigate.js';
import logo from '@/assets/images/logo.png';
import styles from './index.module.scss'

class SiderLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                key: "/home/manage",
                icon: React.createElement(WindowsFilled),
                label: "cms管理",
                children: [{
                    key: "/home/manage/table",
                    label: "项目列表"
                }, {
                    key: "404",
                    label: "权限列表"
                },]
            }],
            selectedKeys: []
        };
    }
    componentDidMount() {
        const url = window.location.href
        const startIndex = url.indexOf('/#')
        const endIndex = url.indexOf('?') === -1 ? url.length : url.indexOf('?')
        const selectedKeys = url.substring(startIndex + 2, endIndex)
        this.setState({
            selectedKeys
        })

    }
    click = (e) => {
        console.log(e);
        console.log(e.key);
        //注意this指向问题，采用箭头函数this就指向当前组件
        this.setState({
            selectedKeys: [e.key]
        })
        this.props.to(e.key);
    }

    openChange() {
        console.log('OpenChange');
    }
    render() {
        return (
            <div className={styles.siderLeft}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" className={styles.img} />
                    cms系统
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    defaultOpenKeys={['/home/manage']}
                    style={{
                        height: '100%',
                        borderRight: 0,
                    }}
                    items={this.state.items}
                    onOpenChange={() => this.openChange()}
                    onClick={this.click}
                    selectedKeys={this.state.selectedKeys}
                />
            </div>
        )
    }
}
// 使用高阶组件包裹当前类组件
const NavigateCompont = WidthUseNavigate(SiderLeft);
// 导出包裹后的类组件
export default NavigateCompont;