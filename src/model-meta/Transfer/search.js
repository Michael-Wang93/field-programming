export default [
    {
        dataIndex:"saleManId",
        title: '名单归属',
        type: 'dropdown',
        mode: 'cascader',
        optionUrl:'/listDistribution/getOrganization'
    },
    {
        dataIndex:"time",
        title: '创建时间',
        type: 'date'
    },
    {
        dataIndex:'name',
        title: '客户姓名',
        type: 'char'
    }
]