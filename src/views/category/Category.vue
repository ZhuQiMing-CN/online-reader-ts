<!--
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/2 10:36
 -->
<template>
    <el-container class="content">
        <el-aside class="left-content">
            <el-menu :default-active="activeMenu" router background-color="#fbfaf8">
                <el-menu-item index="/category/male">
                    <i class="el-icon-location"></i>
                    <span slot="title">男生</span>
                </el-menu-item>
                <el-menu-item index="/category/female">
                    <i class="el-icon-menu"></i>
                    <span slot="title">女生</span>
                </el-menu-item>
                <el-menu-item index="/category/press">
                    <i class="el-icon-document"></i>
                    <span slot="title">出版物</span>
                </el-menu-item>
                <el-menu-item index="/category/picture">
                    <i class="el-icon-setting"></i>
                    <span slot="title">图片漫画</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="right-content">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'Category'
})
export default class Category extends Vue {
    get activeMenu (): string {
        let route = this.$route;
        let { meta, path } = route;
        if (meta.activeMenu) {
            return meta.activeMenu;
        }
        return path;
    }
}
</script>
<style lang="scss" scoped>
</style>
