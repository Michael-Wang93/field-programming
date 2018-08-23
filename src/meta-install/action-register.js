//储存所有的actions
const actions = {};

function getActionName(model, isBatch = false) {
    return isBatch ? `batch-action-${model}` : `operation-action-${model}`;
}

function existAction(model, isBatch) {
    return actions[getActionName(model, isBatch)];
}

//根据model获取对应的action
export function getActions(model, isBatch = false) {
    return existAction(model, isBatch);
}

//注册对应模块的action
export function RegisterAction(model, config) {
    return function (componentClass) {
        componentClass.config = config;
        const actionName = getActionName(model, config.isBatch);
        if(actions[actionName]) {
            actions[actionName].push(componentClass);
        } else {
            actions[actionName] = [componentClass];
        }
    }
}