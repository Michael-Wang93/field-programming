import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import { Input } from 'antd';
const TYPE = 'numberrange';
const SEARCH = 'search';

@RegisterMetaField(TYPE, SEARCH)
export class MetaNumberrangeSearchField extends MetaBaseSearchField {
    render() {
        const { meta, searchData } = this.props;
        const me = this;
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input style={{width: '45%'}} value={searchData.applySumStart} onChange={e => me.changeValue('applySumStart', isNaN(parseFloat(e.target.value))?'': parseFloat(e.target.value))}/>
                <span style={{marginRight: '10px',marginLeft: '10px', width: '8%', 'textAlign': 'center'}}>--</span>
                <Input style={{width: '45%'}} value={searchData.applySumEnd} onChange={e => me.changeValue('applySumEnd', isNaN(parseFloat(e.target.value))?'': parseFloat(e.target.value))}/>
            </div>
        )
    }
}