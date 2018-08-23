import {getComponent} from './type-register'
import {getActions} from './action-register'
import asyncComponent from '../shared/asyncComponent'
 
//储存所有模块的meta信息
const modelMetaCache = {};
const asyncComponentCache = {};

const ProcessMetaMap = {
    list: processListMeta,
    search: processSearchMeta
}

function processMetas(metas, path) {
    const {model, scene} = getModelAndSenceFormPath(path);

    if(getActions(model) && scene === 'list') {
        metas.push({
            dataIndex:"operation",
            title: '操作',
            type: 'action'
        })
    }
    metas = metas.map(meta => {
        meta.model = model;
        meta.scene = scene;
        return ProcessMetaMap[scene] ? ProcessMetaMap[scene](meta) : meta;
    });
    
    return metas;
}

function getHashByMeta(meta, searchData) {
    return JSON.stringify(meta) + JSON.stringify(searchData);
}

function processListMeta(meta) {
    //生成随机字符串
    meta.key = Math.random().toString(36).substr(2);
    meta.render = (text, record, index) => {

        //根据meta动态加载组件
        const AsyncComponent = asyncComponent(getComponent(meta));
        const componentElement = (
            <AsyncComponent {...{text, record, index, meta}}></AsyncComponent>
        );
        return componentElement;
    }
    return meta;
}

function processSearchMeta(meta) {
    meta.key = Math.random().toString(36).substr(2);
    meta.render = (searchData) => {

        //根据meta动态加载组件
        const AsyncComponent = asyncComponent(getComponent(meta));
        const componentElement = (
            <AsyncComponent {...{searchData, meta}}></AsyncComponent>
        );
        return componentElement;
    }
    return meta;
}

//导入所有模块的meta信息
function importAll (r) {
    r.keys().forEach(path => {
        let metas = r(path).default;
        if(!metas) {
            return;
        }
        metas = processMetas(metas, path);
        const {model, scene} = getModelAndSenceFormPath(path);
        const key = getModelMetaMapKey(model, scene);
        modelMetaCache[key] = metas;
    });
}

function getModelAndSenceFormPath(path) {
    const arr = path.split('/');
    const model = arr[1];
    const scene = arr[2].split('.')[0];
    return {model, scene};
}

//meta信息文件的相对位置
function getModelMetaMapKey(model, scene) {
    return `${model}/${scene}`;
}

//获取模块相应视图的meta信息
export function getModelMeta(model, scene) {
    const path = getModelMetaMapKey(model, scene);
    return modelMetaCache[path] || {};
}

//获取模块相应视图的meta信息
export function getModelMetaByUrl(url) {
    
}

export function installModelMeta() {
    return importAll(require.context('../model-meta/', true, /\.js$/));
}

export function installMetaField() {
    return import('../meta-fields');
}

export function installMetaAdhoc() {
    return import('../adhocs');
}

export function installActions() {
    return import('../custom-action');
}

//装载所有的meta信息以及meta组件
export function install() {
    //需要等meta组件装载完毕再装载meta信息
    return Promise.all([installMetaField(), installMetaAdhoc(), installActions()]).then(() => {
        return installModelMeta();
    }).catch(res => {
        console.log(res);
    })
}
