<template>
    <el-container style="height: 100%;-webkit-app-region: drag;">
        <el-aside width="200px" class="aside">
            <div class="side-wrapper">
                <div>
                    <el-button type="primary" @click="dialogFormVisible = true" round size="small" class="btn">创建连接
                    </el-button>
                </div>
                <div class="db-list">
                    <div class="db-wrapper">
                        111
                    </div>
                </div>
            </div>
        </el-aside>
        <el-container style="padding: 30px">
            <router-view></router-view>
        </el-container>
        <el-dialog title="创建连接" :visible.sync="dialogFormVisible">
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
        <el-dialog fullscreen :visible.sync="dialogShellVisible">

        </el-dialog>
    </el-container>
</template>

<script>
    import db from '../db/Storage';
    export default {
        data() {
            return {
                db_tb_redis: null,
                dialogFormVisible: false,
                dialogShellVisible: false,
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
            };
        },
        methods: {
            onLogout: function () {
                this.$electron.ipcRenderer.send("onLogout", false);
            },
            openShell: function () {
                this.dialogShellVisible = true;
            },
            handleAddRedisSave: function () {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        const connect = JSON.parse(JSON.stringify(this.connection));
                        if (db.addConnection(connect) === false) {
                            this.$message.error({
                                message: '',
                                duration: 2000,
                            });
                            return;
                        }
                        this.dialogFormVisible = true;
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
        mounted() {
            this.$electron.ipcRenderer.on("msg", (event, data) => {
                console.log(data)
            });
            console.log(localStorage.getItem("key"));
        },
        watch: {},
        components: {}
    };
</script>

<style lang="scss" scoped>

    .aside {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to bottom, #efefef, #efefef);
        height: 100%;
        overflow: auto;

    }

    .main {
        padding: 0;
        margin: 0;
        overflow: hidden;
        display: flex;
        flex: 1;
        flex-shrink: 0;
    }

    .side-wrapper {
        padding: 10px;
        display: flex;
        flex-direction: column;
        height: 1000px;

        .btn {
            width: 100%;
        }
    }

    .db-list {
        margin-top: 10px;
        height: 528px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .db-wrapper {
        height: 1000px;
        background: #dd6161;
        width: 100%;
    }
</style>
