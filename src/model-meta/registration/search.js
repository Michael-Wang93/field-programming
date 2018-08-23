export default [
    {
        dataIndex:['regStartTime', 'regEndTime'],
        title: '注册时间',
        type: 'timerange'
    },
    {
        dataIndex:"userName",
        title: '客户姓名',
        type: 'char'
    },
    {
        dataIndex:"city",
        title: '所在城市',
        type: 'char'
    },
    {
        dataIndex:"mediaSource",
        title: '注册渠道',
        type: 'char'
    },
    {
        dataIndex:['applySumStart', 'applySumEnd'],
        title: '申请额度',
        type: 'numberrange'
    },
    {
        dataIndex:"incomeType",
        title: '收入类型',
        type: 'dropdown',
        options: [
            {
                code: '银行转账',
                name: '银行转账'
            },
            {
                code: '现金发放',
                name: '现金发放'
            }
        ]
    },
    {
        dataIndex:"professionType",
        title: '从事职业',
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
    },
    {
        dataIndex:"incomeRange",
        title: '收入范围',
        type: 'dropdown',
        options: [
            {
                code: '2000以下',
                name: '2000以下'
            },
            {
                code: '2000-5000',
                name: '2000-5000'
            },
            {
                code: '5000-10000',
                name: '5000-10000'
            },
            {
                code: '10000以上',
                name: '10000以上'
            }
        ]
    },
    {
        dataIndex:['issuedStartTime', 'issuedEndTime'],
        title: '下发时间',
        type: 'timerange'
    },
    {
        dataIndex:"issuedStatusList",
        title: '状态',
        type: 'dropdown',
        mode: 'multiple',
        options: [
            {
                code: '0',
                name: '未下发'
            },
            {
                code: '1',
                name: '下发中'
            },
            {
                code: '2',
                name: '下发成功'
            },
            {
                code: '3',
                name: '获客名单下发重复'
            },
            {
                code: '4',
                name: '电销手机号重复'
            },
            {
                code: '5',
                name: '信审手机号重复'
            }
        ]
    },
    {
        dataIndex:"isAton",
        title: '微粒贷',
        type: 'dropdown',
        options: [
            {
                code: '',
                name: '全部'
            },
            {
                code: '1',
                name: '还款中'
            },
            {
                code: '2',
                name: '已还完'
            },
            {
                code: '3',
                name: '否'
            }
        ]
    },
    {
        dataIndex:"isCreditRecord",
        title: '信用记录',
        type: 'radio'
    },
    {
        dataIndex:"isHousingFund",
        title: '公积金',
        type: 'radio'
    },
    {
        dataIndex:"isWelfare",
        title: '社保',
        type: 'radio'
    },
    {
        dataIndex:"isInsurance",
        title: '寿险保单',
        type: 'radio'
    },
    {
        dataIndex:"houseProperty",
        title: '是否有房',
        type: 'radio'
    },
    {
        dataIndex:"isHasCar",
        title: '是否有车',
        type: 'radio'
    },
    {
        dataIndex:"isReferral",
        title: '是否转介绍',
        type: 'radio'
    }
]