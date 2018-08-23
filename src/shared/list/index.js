import DefaultTable from '../table';
import DefaultSearch from '../search';
import { Component } from 'react';
import {getModelConfig} from "../../model-config";

function getCustomComponent (r, model, moduleName) {
    let customCode = null;
    r.keys().forEach(path => {
        if(path.indexOf(`${model}/${moduleName}`) > -1) {
            let code = r(path).default;
            if(code) {
                customCode = code;
            }
        }
        
    });
    return customCode;
}


export default class CommonList extends Component {

    state = {
        query: ''
    }

    onSearchChange = (query) => {
        this.setState({
            query: query 
        });
    }

    
    render() {
        const modelConfig = getModelConfig(this.props.model);
        const {table, search, model} = this.props;
        const tableProps = Object.assign({}, table, {model: model}, {query: {...this.state.query}});
        const searchProps = Object.assign({}, search, {model: model}, {onSearchChange: (query) => {this.onSearchChange(query)}});
        const Table = getCustomComponent(require.context('../../../routes/', true, /\.js$/), model, 'table') || DefaultTable;
        const Search = getCustomComponent(require.context('../../../routes/', true, /\.js$/), model, 'search') || DefaultSearch;
        return (
            <div style={{width: '100%'}}>
                {modelConfig.modules.indexOf('search') > -1 ?  <Search {...searchProps} ></Search> : ''}
                {modelConfig.modules.indexOf('table') > -1 ? (
                    <div style={{width: '100%', 'marginTop': '30px'}}>
                        <Table {...tableProps}></Table>
                    </div>
                ) : ''}
                
            </div>
        )
    }
}