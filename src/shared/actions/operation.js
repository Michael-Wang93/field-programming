import BaseAction from './base'
import {Menu, Dropdown, Icon, Divider} from 'antd'

const MAX_BUTTOM_COUNT = 4;
export default class Operation extends BaseAction {
    getGroup(actions) {
        return (
            <div>
                {
                    actions.map((Action, index) => {
                        const actionInstance = new Action();
                        return (
                            <span>
                                <a href="javascript: void (0);"
                                    key={this.props.meta.key}
                                    onClick={actionInstance['onClick'].bind(actionInstance, this.props)}>
                                    {Action.config.label}
                                </a>
                                {index < actions.length - 1 ?  <Divider type="vertical"/> : ''}
                            </span>
                        )
                    })  
                }
            </div>
        )
    }
    getDropdown(actions) {
        const menu = (
            <Menu>
                {
                    actions.map(Action => {
                        const actionInstance = new Action();
                        return (
                            <Menu.Item>
                                <a href="javascript: void (0);"
                                    key={this.props.meta.key}
                                    onClick={actionInstance['onClick'].bind(actionInstance, this.props)} style={{marginRight: 5}}>
                                    {Action.config.label}
                                </a>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
          );
        return (
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                操作 <Icon type="down" />
                </a>
            </Dropdown>
        )
    }
    render() {
        const { actions } = this.props; 
        return actions.length < MAX_BUTTOM_COUNT ? this.getGroup(actions) : this.getDropdown(actions);
    }
}