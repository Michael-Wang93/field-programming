import { Table, Card } from 'antd';
import { Component } from 'react';
import {getModelMeta} from "../../meta-install";
import {getActions} from "../../meta-install/action-register";
import BatchAction from "../actions/batchAction";
import queryString from 'query-string'
import PropTypes from "prop-types";

const pageSizeOptions = ['10', '20', '30', '40'];
const rowKey = 'id';

export default class CommonTable extends Component {

    static contextTypes = {
        router: PropTypes.object
      }

    state = {
        model: '',
        selectedRowKeys: [],
        page: 1,
        pageSize: 10,
        loading: true,
        totalCount: 0,
        data: [],
        selected: [],
    }

    constructor(props) {
        super(props);
        this.state.model = this.props.model;
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
            return false
        }
        return true;
    }
    
    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.query) !== JSON.stringify(this.props.query)) {
            this.refresh(Object.assign({}, nextProps.query || {}));
        }
    }

    getColumns = () => {
        const model = this.state.model;
        return getModelMeta(model, 'list');
    }

    getDataSource = () => {
        return this.state.data && this.state.data.length ? this.state.data : [];
    }

    getBatchActions = () => {
        return getActions(this.state.model, true);
    }

    getPagination = () => {
        const {page, pageSize, totalCount} = this.state;
        return {
            current: +page,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: +pageSize,
            showTotal(total){
                const pages = Math.ceil(total/pageSize);
                return `共 ${total} 条记录 第 ${page} / ${pages} 页`
            },
            total: totalCount,
            onChange(page){
                this.setState({
                    page,
                    pageSize
                });
            },
            onShowSizeChange(page, size){
                this.setState({
                    pageSize: size,
                    page: 1
                })
            }
        }
    }

    getProps = ()=> {
        const props = Object.assign({}, {
            pageSizeOptions, rowKey, columns: this.getColumns(), dataSource: this.getDataSource(),
            loading: this.state.loading,
            pagination: this.getPagination(),
            onChange: (pagination) => {this.onTableChange(pagination.current)},
            rowSelection: {
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: this.onSelectChange,
            }
        }, this.props);
        return props;
    }

    processParams = (params) => {
        return params;
    }

    refresh = (params)=> {
        this.setState({
            loading: true
        });
        this.getTableData(this.processParams(params)).then((res) => {
            const {pageNum, pageSize, pages, list} = res.result;
            this.setState({
                selectedRowKeys: [],
                loading: false,
                page: pageNum,
                pageSize: pageSize,
                data: list || []
            });
        }).catch(e => {
            this.setState({
                selectedRowKeys: [],
                data: []
            });
            console.log(e);
        })
    }

    onTableChange = (indexPage) => {
        const params = {
            page: indexPage,
            pageSize: this.state.pageSize
        }
        this.refresh(params);
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    
    render() {
        const props = this.getProps();
        const batchActions = this.getBatchActions() || [];
        const batchActionContext = Object.assign({}, this.props, this.state);
        return (
            <div>
                {
                    batchActions.length > 0 ? <BatchAction {...batchActionContext} actions={batchActions}></BatchAction> : ''
                }
                <Table
                    style={{background: 'white'}}
                    {...props}
                ></Table>
            </div>
        )
    }

    getTableQueryParams = (search) => {
        const parse = queryString.parse(decodeURIComponent(search)) || {};
        parse.page = parse.page || 1;
        parse.pageSize = parse.pageSize || 10;
        return parse;
    }

    getTableData = (parse) => {
        new Promise((resolve) => {
            resolve();
        }).then(() => {
            throw new Error('请复写获取数据的方法');
        }).catch(() => {
            return {};
        });
        
    }

    componentDidMount() {
        this.refresh({
            page: this.state.page
        });
    }
}