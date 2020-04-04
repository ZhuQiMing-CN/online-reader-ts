<template>
    <div class="content">
        <div class="index-search">
            <el-autocomplete v-model="query" :fetch-suggestions="querySearchAsync" placeholder="请输入书本名或者作者名" @select="handleSelect" @keyup.enter.native="handleSelect({value:query})" size="medium" clearable class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="handleSelect({value:query})"></el-button>
            </el-autocomplete>
            <div ref="Echart" style="width: 750px;height: 580px;margin: auto"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Searchauto, Searchhotwords } from '@/axios/api';

import * as echarts from 'echarts';
import 'echarts-wordcloud';

interface EchartData {
    [propName: string]: any;
}

@Component({
    name: 'Index'
})
export default class Index extends Vue {
    private query = '';
    private hotwords: any;
    private restaurants: any;
    private timeout: number | undefined;
    private echartData: EchartData = [];

    // 获取搜索热词
    private getHotwords (): void {
        Searchhotwords().then(res => {
            if (res.ok === true) {
                this.hotwords = res.searchHotWords;
                for (let i of this.hotwords) {
                    this.echartData.push({
                        value: i.times,
                        name: i.word
                    });
                }
                this.drawLine();
            }
        });
    }

    private querySearchAsync (queryString: string, cb: any): void {
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
    private handleSelect (item: any): void {
        if (item.value === '暂无数据' || item.value === '') {
            this.query = '';
            return;
        }
        this.$router.push({ path: '/search', query: { val: item.value } });
    }

    // 生成词云
    private drawLine () {
        let myChart = echarts.init(this.$refs.Echart as HTMLCanvasElement);
        let options = {
            tooltip: {
                show: false
            },
            series: [{
                type: 'wordCloud',
                gridSize: 8,
                shape: 'star',
                sizeRange: [10, 80],
                rotationRange: [0, 0],
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 8,
                        shadowColor: '#555'
                    }
                },
                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                data: this.echartData
            }]
        };
        myChart.setOption(options);
        myChart.on('click', function (params: any) {
            window.location.href = '/search?val=' + params.name;
        });
    }

    mounted (): void {
        this.getHotwords();
    }
}
</script>

<style lang="scss" scoped>
    .index-search {
        padding-top: 40px;
    }

    .input-with-select {
        width: 450px;
    }
</style>
