import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import { Input } from 'antd';
const TYPE = 'char';
const LIST = 'list';
const SEARCH = 'search';


@RegisterMetaField(TYPE, LIST)
export class MetaCharListField extends MetaBaseListField {
    render() {
        const {text} = this.props;
        return (
            <div>{text}</div>
        )
    }
}

@RegisterMetaField(TYPE, SEARCH)
export class MetaCharSearchField extends MetaBaseSearchField {
    render() {
        const { meta, searchData } = this.props;
        const me = this;
        return (
            <Input value={searchData[meta.dataIndex]} onChange={e=> me.changeValue(meta.dataIndex, e.target.value)}/>
        )
    }
}