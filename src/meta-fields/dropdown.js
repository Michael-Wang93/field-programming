import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import { Select, Cascader } from 'antd';
import request from  '../../utils/request'
const TYPE = 'dropdown';
const LIST = 'list';
const SEARCH = 'search';

const Option = Select.Option;


@RegisterMetaField(TYPE, LIST)
export class MetaDropdownListField extends MetaBaseListField {
    render() {
        const {text} = this.props;
        return (
            <div>{text}</div>
        )
    }
}

@RegisterMetaField(TYPE, SEARCH)
export class MetaDropdownSearchField extends MetaBaseSearchField {
    state = {
        options: this.props.meta.options
    }

    getOptions = () => {
        return this.state.options || [];
    }


    getSelect = () => {
        const { meta, searchData } = this.props;
        const me = this;
        return (
            <Select 
                showSearch
                mode={meta.mode}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                defaultValue={searchData[meta.dataIndex]} onChange={value=> me.changeValue(meta.dataIndex, value)}>
                {
                   this.getOptions().map((item, index) => {
                        return <Option key={meta.key + index} value={item.code} >{item.name}</Option>
                    })
                }
            </Select>
        )
    }

    getCascader = ()=> {
        const { meta } = this.props;
        const me = this;
        return (

            <Cascader
                    placeholder="请选择"
                    options={this.getOptions()}
                    changeOnSelect
                    onChange={value=> me.changeValue(meta.dataIndex, value)}
            />
        )
    }

    render() {
        const { meta, searchData } = this.props;
        const me = this;
        return (
            meta.mode === 'cascader' ? this.getCascader() : this.getSelect()
        )
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    async componentDidMount() {
        const { meta, searchData } = this.props;
        if(meta.optionUrl && !this.getOptions().length) {
            const res = await request('/telesale-back' + meta.optionUrl);
            !this.isCancelled && this.setState({
                options: res.result
            })
        }
    }
}