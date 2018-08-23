import config from './data'

const defaultConfig = {
    modules: ['search', 'table']
}

function getModelConfig(model) {
    if(config[model]) {
        return Object.assign({}, defaultConfig, config[model]);
    }
    return defaultConfig;
}



export {
    getModelConfig
}