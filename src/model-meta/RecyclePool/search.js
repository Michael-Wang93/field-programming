export default [
    {
        dataIndex:'name',
        title: '姓名',
        type: 'char'
    },
    {
        dataIndex:"time",
        title: '关闭时间',
        type: 'date'
    },
    {
        dataIndex:"city",
        title: '媒体来源',
        type: 'char'
    },
    {
        dataIndex:"custId",
        title: '客户ID',
        type: 'char'
    },
    {
        dataIndex:"saleManId",
        title: '名单归属',
        type: 'dropdown',
        mode: 'cascader',
        optionUrl:'/listDistribution/getOrganization'
    },
    {
        dataIndex:"status",
        title: '名单状态',
        type: 'dropdown',
        options: [
            {
                code: '上班族',
                name: '上班族'
            },
            {
                code: '企业主',
                name: '企业主'
            },
            {
                code: '公务员',
                name: '公务员'
            },
            {
                code: '个人户',
                name: '个人户'
            },
            {
                code: '自由职业者',
                name: '自由职业者'
            }
        ]
    }
]