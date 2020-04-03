<!--
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/1 16:57
 -->
<template>
    <el-container>
        <header-view></header-view>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <p>本站提供的内容均来源于网络,纯属共享学习之用,若有侵权,请与管理员邮箱联系！</p>
        </el-footer>
        <el-backtop></el-backtop>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderView from '@/components/HeaderView.vue';

@Component({
    name: 'MainView',
    components: { HeaderView }
})
export default class MainView extends Vue {
}
</script>

<style lang="scss" scoped>
    #MainView {}
</style>
