import { Component } from "react";
import { Input } from 'antd';

export class MetaBaseField extends Component {
    render() {
        return (
            <div>哈哈哈你永远看不到我！</div>
        )
    }
}

export class MetaBaseListField extends MetaBaseField{
    render() {
        const {text} = this.props;
        return (
            <span>{text}</span>
        )
    }
}

export class MetaBaseSearchField extends MetaBaseField{
    processMetaValue = (value) => {
        return value;
    }
    changeValue = (key, value)=> {
        const { searchData } = this.props;
        searchData[key] = this.processMetaValue(value);
        this.forceUpdate();
    }
    render() {
        const { meta, searchData } = this.props;
        const me = this;
        return (
            <Input value={searchData[meta.dataIndex]} onChange={e=> me.changeValue(searchData[meta.dataIndex], e.target.value)}/>
        )
    }
}

export class MetaBaseAddField extends MetaBaseField{
    state = {
        searchData: this.props.searchData,
        meta: this.props.meta
    }
    changeValue = (key, value)=> {
        this.props.searchData[key] = value;
        this.forceUpdate();
    }
    render() {
        const { meta, searchData } = this.state;
        return (
            <Input value={searchData[meta.dataIndex]} onChange={e=> this.changeValue('userName', e.target.value)}/>
        )
    }
}