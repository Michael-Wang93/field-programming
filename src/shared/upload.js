import React, {Component} from 'react';
import Styles from './index.less'
import {Upload, Icon, message} from 'antd';
const Dragger = Upload.Dragger;

export default class UploadFile extends Component {


    state = {
        loading: false,
        fileId: '',
        accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        showUploadList: false,
        sumNumber: 0,
        sucessNumber: 0
    };
    onChange = (file) => {
        const status = file.status;
            if (status === 'uploading') {
                this.setState({
                    loading: true
                });
            }
            if(status === 'error'){
                message.error('上传失败');
                this.setState({
                    loading: false
                });
            }
            if(status === 'done'){
                this.setState({
                    loading: false
                });
                if(file.response && file.response.success) {
                    this.setState({
                        fileId: file.response.result.fileId,
                        sumNumber: file.response.result.sumNumber || 0,
                        sucessNumber: file.response.result.sucessNumber || 0
                    })
                } else {
                    message.error('解析失败!');
                }
            }
    };
    render() {
        let uploadProps = Object.assign({}, this.props, {
            onChange: this.onChange,
            accept: this.state.accept,
            showUploadList: this.state.showUploadList,
            disabled: this.state.loading
        });
        return  (
            <div className={Styles.upload}>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或将文件拖拽到这里上传客户名单</p>
                        <p className="ant-upload-hint">支持扩展名：xls , xlsx</p>
                    </Dragger>
                    {this.state.fileId? <p>上传{this.state.sumNumber}条记录，解析成功
                        <span className={Styles.success}>{this.state.sucessNumber}</span>条，解析失败
                        <span className={Styles.fail}>{this.state.failNumber}</span>条</p>: null}
                </div>
        )
    }
}