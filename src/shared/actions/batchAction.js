import BaseAction from './base'
import {Menu, Dropdown, Icon, Button} from 'antd'

const MAX_BUTTOM_COUNT = 8;
export default class batchAction extends BaseAction {
    getGroup(actions) {
        return (
            <div style={{padding: '0px 20px 20px', overflow: 'auto'}}>
                {
                    actions.map(Action => {
                        const actionInstance = new Action();
                        return (
                            <span style={{'float': (Action.config.position || 'left')}}>
                                <Button href="javascript: void (0);"
                                    key={Math.random().toString(36).substr(2)}
                                    type={Action.config.type || 'primary'}
                                    onClick={actionInstance['onClick'].bind(actionInstance, this.props)} style={{marginRight: 30}}>
                                    {Action.config.label}
                                </Button>
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
                                    key={Math.random().toString(36).substr(2)}
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
            <div style={{padding: '20px'}}>
                <Dropdown overlay={menu}>
                    <Button>
                    批量操作 <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        )
    }
    render() {
        const { actions } = this.props; 
        return actions.length < MAX_BUTTOM_COUNT ? this.getGroup(actions) : this.getDropdown(actions);
    }
}