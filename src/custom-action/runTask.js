import {RegisterAction} from '../meta-install/action-register'
import BaseAction from './base'

const MODEL = 'runTask';

@RegisterAction(MODEL, {
    label: '下载',
})
export class RunTaskDelete extends BaseAction  {
    onClick = (options) => {
        alert('下载');
    }
}

@RegisterAction(MODEL, {
    label: '导出Excel',
    type: 'default',
    isBatch: true
})
export class RunTaskBatchExportExcel extends BaseAction  {
    onClick = (options) => {
        alert('导出Excel');
    }
}
