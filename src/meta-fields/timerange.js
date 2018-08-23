import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const TYPE = 'timerange';
const SEARCH = 'search';


@RegisterMetaField(TYPE, SEARCH)
export class MetaTimerangeSearchField extends MetaBaseSearchField {

    getTime(pre, next) {
        const { searchData } = this.props;
        let prevData = null, nextDate = null;
        if(searchData[pre]){
            prevData = moment(searchData[pre])
        }
        if(searchData[next]){
            nextDate = moment(searchData[next])
        }
        return [prevData, nextDate]
    }
    changeTime(pre, next, value) {
        const { meta, searchData } = this.props;
        const data = {
            [pre]: +moment(`${value[0]} 00:00:00`),
            [next]: +moment(`${value[1]} 23:59:59`)
        }
        searchData[pre] = data[pre];
        searchData[next] = data[next];
    }
    render() {
        const { meta } = this.props;
        return (
            <RangePicker value={this.getTime(meta.dataIndex[0], meta.dataIndex[1])} onChange={(dates, dateStrings)=> this.changeTime(meta.dataIndex[0], meta.dataIndex[1], dateStrings)}/>
        )
    }
}