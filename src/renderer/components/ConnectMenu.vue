<template>
    <el-menu default-active="0" active-text-color="#706963" @select="handleSelect">
        <el-menu-item v-for="(item, index) of connects" :key="item.showName" :index="index.toString()">
            <div class="menu-item">
                <div class="menu-item-name">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.showName}}</span>
                </div>
                <div>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import db from '../db/Storage';
    export default {
        name: "connectMenu",
        data (){
            return {
                connects: [],
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            init: function () {
                const connects = db.getConnections(true);

                for (const item of connects) {
                    item.showName = item.name || `${item.host}@${item.port}`;
                }

                this.connects = connects;

                console.log(connects)
            },
            getConnectionKey: function (item) {
                return db.getConnectionKey(item);
            },
            handleSelect(key) {
                console.log(this.connects[key]);
            }
        }
    }
</script>

<style scoped>
    .el-menu {
        border-right: none;
        border-radius: 4px;

    }
    .el-menu-item {
        color: #AEA7A1;
        padding: 0 10px;
    }
    .menu-item {
        display: flex;
        flex-direction: row;
    }
    .menu-item-name {
        flex: 1;
    }
</style>
