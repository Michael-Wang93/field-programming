import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import { DatePicker } from 'antd';
import moment from 'moment';
const TYPE = 'date';
const SEARCH = 'search';

const dateFormat = 'YYYY-MM-DD';


@RegisterMetaField(TYPE, SEARCH)
export class MetaTimerangeSearchField extends MetaBaseSearchField {

    getTime(next) {
        const { searchData } = this.props;
        let nextDate = null;
        if(searchData[next]){
            nextDate = moment(searchData[next])
        }
        return nextDate
    }
    changeTime(next, value) {
        const { searchData } = this.props;
        searchData[next] = +moment(`${value[1]} 23:59:59`);
    }
    render() {
        const { meta } = this.props;
        return (
            <DatePicker style={{width: '100%'}} defaultValue={this.getTime(meta.dataIndex)} format={dateFormat} onChange={(dates, dateStrings)=> this.changeTime(meta.dataIndex, dateStrings)}/>
        )
    }
}