import { Form, Row, Col, Button, Card} from 'antd';
import { Component } from 'react';
import {getModelMeta} from "../../meta-install";
const { Item } = Form;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
        md: {span: 7},
        lg: {span: 7}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
        md: {span: 17},
        lg: {span: 17},
    },
};

const colCountMap = {
    '1': {
        sm: 24,
        md: 24,
        xl: 24,
        xll: 24,
    },
    '2': {
        sm: 24,
        md: 24,
        xl: 12,
        xll: 12,
    },
    '3': {
        sm: 24,
        md: 12,
        xl: 8,
        xll: 8,
    },
    '4': {
        sm: 24,
        md: 8,
        xl: 6,
        xll: 6,
    }
}

export default class CommonSearch extends Component {

    state = {
        model: '',
        searchData: {}
    }

    static defaultProps = {
        layout: 'inline',
        colCount: '4'
    }

    constructor(props) {
        super(props);
        this.state.model = this.props.model;
    }


    getMetas = () => {
        const model = this.state.model;
        return getModelMeta(model, 'search');
    }

    query = ()=> {
        const {onSearchChange} = this.props;
        if(onSearchChange) {
            onSearchChange(this.state.searchData);
        }
    }

    resetData = ()=> {
        this.setState({
            ...this.state,
            searchData: {}
        })
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
            return false
        }
        return true;
    }
    
    render() {
        const props = Object.assign({}, this.props);
        const {layout, colCount} = props;
        const colSizeMap = colCountMap[colCount];
        const metas = this.getMetas();
        return (
            <Card title="搜索管理"  bordered={true}>
                <Form  layout={layout} style={{padding: '20px 40px'}}>
                    <Row gutter={{md: 8, lg: 12, xl: 12}}>
                        {
                            metas.map((meta,index) =>
                                <Col sm={colSizeMap.sm} md={colSizeMap.md} xl={colSizeMap.xl}  xll={colSizeMap.xll} key={index} style={{marginBottom: 24}}>
                                    <Item label={meta.title} {...formItemLayout} style={{width: '95%'}}>
                                        {meta.render(this.state.searchData)}
                                    </Item>
                                </Col>
                            )
                        }
                    </Row>

                    <span style={{float: 'right', marginRight: 50}}>
                        <Button icon="search" type="primary" onClick={() => {this.query()}}>查询</Button>
                        <Button icon="reload" style={{marginLeft: 8}} onClick={this.resetData}>重置</Button>
                    </span>
                </Form>
            </Card>
        );
    }
}