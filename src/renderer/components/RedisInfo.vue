<template>
    <div>
        <Empty v-if="connects.length = 0"></Empty>


    </div>
</template>

<script>
    import Empty from './Empty';
    import db from '../db/Storage';
    export default {
        name: "RedisInfo",
        components:{Empty},
        data (){
            return {
                connects: [],
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

                for (const item of connects) {
                    item.showName = item.name || `${item.host}@${item.port}`;
                }

                this.connects = connects;

                console.log(connects)
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
