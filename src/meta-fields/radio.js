import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const TYPE = 'radio';
const SEARCH = 'search';

const defaultRadios = [
    {
        code: '',
        name: '全部'
    },
    {
        code: '1',
        name: '是'
    },
    {
        code: '2',
        name: '否'
    }
]

@RegisterMetaField(TYPE, SEARCH)
export class MetaRadioSearchField extends MetaBaseSearchField {
    render() {
        const { meta, searchData } = this.props;
        const me = this;
        const radios = meta.options ? meta.options : defaultRadios;
        return (
            <RadioGroup onChange={e => me.changeValue(meta.dataIndex, e.target.value)} value={searchData[meta.dataIndex] || ''}>
                {
                    radios.map(item => {
                        return (
                            <Radio value={item.code}>{item.name}</Radio>
                        )
                    })
                }
            </RadioGroup>
        )
    }
}