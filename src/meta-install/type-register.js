const scene = ['list', 'edit'];

//储存所有的meta组件和adhoc组件
const component = {};

function getMetaComponentName(type, scene) {
    return `meta-component-${type}-${scene}`;
}

function getAdhocComponentName(model, dataIndex, scene) {
    return `adhoc-component-${model}-${dataIndex.toString()}-${scene}`;
}

function existAdhocComponent(model, dataIndex, scene) {
    return component[getAdhocComponentName(model, dataIndex, scene)];
}

function existMetaComponent(type, scene) {
    return component[getMetaComponentName(type, scene)];
}

//根据meta获取相应的组件
export function getComponent(meta) {
    const {model, dataIndex, type, scene} = meta;

    //先检查adhoc中有没有，有的话优先返回
    if(existAdhocComponent(model, dataIndex, scene)) {
        return existAdhocComponent(model, dataIndex, scene);
    }
    return existMetaComponent(type, scene);
}

//注册meta组件
export function RegisterMetaField(type, scene) {
    return function (componentClass) {
        component[getMetaComponentName(type, scene)] = componentClass;
    }
}

//注册adhoc
export function RegisterAdhocField(model, dataIndex, scene) {
    return function (componentClass) {
        component[getAdhocComponentName(model, dataIndex, scene)] = componentClass;
    }
}