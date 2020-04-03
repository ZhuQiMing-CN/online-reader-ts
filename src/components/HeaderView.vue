<!--
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/1 21:24
 -->
<template>
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
                 background-color="#545c64"
                 text-color="#fff" active-text-color="#ffd04b">
            <div class="logo">This is a Logo</div>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/category/male">热门分类</el-menu-item>
            <el-menu-item index="/ranking/rmale">排行榜</el-menu-item>
            <el-menu-item index="/bookshelf">我的书架</el-menu-item>
            <el-autocomplete v-model="query" :fetch-suggestions="querySearch" placeholder="请输入书本名或者作者名" @select="querySelect" @keyup.enter.native="querySelect({value:query})" size="small" clearable class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="querySelect({value:query})"></el-button>
            </el-autocomplete>
        </el-menu>
    </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Searchauto, Searchhotwords } from '@/axios/api';

@Component({
    name: 'HeaderView'
})
export default class HeaderView extends Vue {
    private activeIndex = '/category/male';
    private query = '';
    private hotwords: any;
    private restaurants: any;
    private timeout: number | undefined;

    // 获取搜索热词
    private getHotwords (): void {
        Searchhotwords().then(res => {
            if (res.ok === true) {
                this.hotwords = res.searchHotWords;
            }
        });
    }

    private querySearch (queryString: string, cb: any) {
        interface Results {
            [propName: string]: any;
        }
        let results: Results = [];
        if (this.query === '') {
            this.restaurants = this.hotwords;
            for (let i of this.restaurants) {
                i.value = i.word;
            }
            results = this.restaurants;
        } else {
            // 搜索自动补充
            let parmas = {
                query: this.query
            };
            Searchauto(parmas).then(res => {
                if (res.ok === true) {
                    this.restaurants = res.keywords;
                    for (let i of this.restaurants) {
                        results.push({
                            value: i
                        });
                    }
                    if (results.length === 0) {
                        results = [{ value: '暂无数据' }];
                    }
                }
            });
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            cb(results);
        }, 3000 * Math.random());
    }

    // 模糊搜索
    private querySelect (item: any) {
        if (item.value === '暂无数据' || item.value === '') {
            this.query = '';
            return;
        }
        this.$router.push({ path: '/search', query: { val: item.value } });
    }

    mounted (): void {
        this.activeIndex = this.$route.path;
        this.getHotwords();
    }
}
</script>
<style lang="scss" scoped>
    .logo {
        width: 120px;
        height: 60px;
        line-height: 60px;
        float: left;
        margin: 0px 60px;
    }

    .input-with-select {
        width: 280px;
        padding: 14px 0px;
        position: absolute;
    }
</style>
