<template>
    <div class="content-wrapper">
        <Empty v-if="JSON.stringify(connect)=='{}'"/>
        <el-container v-else class="info-wrapper">
            <div class="info-content">
                <div class="info-header">
                    <h2> {{connect.name}} </h2>
                    <el-select class="db-select" v-model="selectedDbIndex[getConnectionPoolKey(connect)]" placeholder="DB" size="mini" @change="changeDb(getConnectionPoolKey(connect))">
                        <el-option
                                v-for="index in dbs[getConnectionPoolKey(connect)]"
                                :key="index"
                                :label="'DB' + index"
                                :value="index">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditClick"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </div>
            </div>
        </el-container>
        <el-dialog title="修改连接" :visible.sync="dialogFormVisible">
            <el-form :model="connection" :rules="rules" ref="ruleForm">
                <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
                    <el-input v-model="connection.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="host" label="Host" :label-width="formLabelWidth">
                    <el-input v-model="connection.host" placeholder="127.0.0.1" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="port" label="Port" :label-width="formLabelWidth">
                    <el-input v-model="connection.port" placeholder="6379" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                    <el-input v-model="connection.password" show-password autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleAddRedisCancel">取 消</el-button>
                <el-button type="primary" @click="handleAddRedisSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Empty from './Empty';
    import db from '../db/Storage';
    import redis from '../db/redis';
    export default {
        name: "RedisInfo",
        components:{Empty},
        data (){
            return {
                dbs:{},
                connects: [],
                connect: {},
                key:'',
                selectedDbIndex: {},
                dialogFormVisible: false,
                connection: {
                    name: '',
                    host: '',
                    port: '',
                    password: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    host: [
                        {required: true, message: '请输入Redis地址', trigger: 'blur'},
                    ],
                    port: [
                        {required: true, message: '请输入redis端口号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                },
                formLabelWidth: '55px'
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        methods: {
            init: function () {
                const connects = db.getConnections(true);
                this.connects = connects;
            },
            initConnection: function(connect,key){
                if (!connect) {
                    this.$message.error({
                        message: 'Connection Config Get Failed',
                        duration: 3000,
                    });
                    return;
                }
                const client = this.setGlobalConnection(connect, key);
                console.log(client)
            },
            getConnectionPoolKey(connection) {
                return connection.host + connection.port + connection.name;
            },
            setGlobalConnection: function (connect,key) {
                const client = redis.createConnection(connect.host, connect.port, connect.auth, key);
                client.on('error', (err) => {
                    this.$message.error({
                        message: 'Redis Client On Error: ' + err,
                        duration: 3000,
                    });
                });
                return client;
            },
            handleEditClick: function (){
                this.connection = this.connect;
                this.dialogFormVisible = true;
            },
            handleAddRedisSave: function () {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        const connect = JSON.parse(JSON.stringify(this.connection));
                        console.log(connect)
                        console.log(this.connects[this.key])
                        if (db.editConnection(this.connects[this.key],connect) === false) {
                            this.$message.error({
                                message: '修改连接失败',
                                duration: 2000,
                            });
                            return;
                        }else {
                            this.$message.success({
                                message: '修改连接成功',
                                duration: 2000,
                            });
                            this.connect = connect;
                        }
                        this.dialogFormVisible = false;
                    } else {
                        return false;
                    }
                });
            },
            handleAddRedisCancel() {
                this.dialogFormVisible = false;
                this.$refs['ruleForm'].resetFields();
            }
        },
        watch: {
            //监听相同路由下参数变化的时候，从而实现异步刷新
            '$route'(to,from) {
                //做一些路由变化的响应
                //打开加载动画
                //this.loading = true;
                //重新获取数据
                //this.initData();
                /** 初始化其他数据 */
                this.connect = this.$route.query.connect;
                this.key = this.$route.query.key;
                this.initConnection(this.connect,this.$route.query.key)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .content-wrapper {
        width: 100%;
        height: 100%;
    }
    .info-wrapper {
        height: 1000px;
        width: 100%;
        padding: 30px;
        .info-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .info-header {
            display: flex;
            flex-direction: row;
            h2 {
                flex: 1;
                line-height: 29px;
                font-size: 25px;
            }
            .db-select {
                width: 80px;
                height: 29px;
                margin-right: 10px;
            }
            .el-input--mini .el-input__inner {
                height: 29px;
                line-height: 29px;
            }
        }
    }
</style>
