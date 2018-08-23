import {RegisterAction} from '../meta-install/action-register'
import BaseAction from './base'

const MODEL = 'ClosePool';

@RegisterAction(MODEL, {
    label: '手动派单',
    isBatch: true
})
export class ClosePoolDelete extends BaseAction  {
    onClick = (options) => {
        alert('手动派单');
    }
}

