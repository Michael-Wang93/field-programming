import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import { Select } from 'antd';
const TYPE = 'checkbox';
const LIST = 'list';
const SEARCH = 'search';

const Option = Select.Option;


@RegisterMetaField(TYPE, LIST)
export class MetaCheckboxListField extends MetaBaseListField {
    render() {
        const {text} = this.props;
        return (
            <div>{text}</div>
        )
    }
}

@RegisterMetaField(TYPE, SEARCH)
export class MetaCheckboxSearchField extends MetaBaseSearchField {
    render() {
        const { meta, searchData } = this.props;
        return (
            <Select defaultValue={searchData[meta.dataIndex]} onChange={e=> this.changeValue(meta.dataIndex, e.target.value)}>
                {
                    meta.options.map(item => {
                        return <Option value={item.code} >{item.name}</Option>
                    })
                }
            </Select>
        )
    }
}