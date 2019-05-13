export default {
    //连接列表
    db_tb_redis: {
        name: 'db_tb_redis',
        options: { autoIncrement: true, keyPath: 'id'},
        columns: [
            {name: 'name', prop: 'name', option: { unique: false}},
            {name: 'host', prop: 'host', option: {unique: true}},
            {name: 'port', prop: 'port', option: {unique: true}},
            {name: 'password', prop: 'password', option: {unique: true}},
        ]
    }
}
