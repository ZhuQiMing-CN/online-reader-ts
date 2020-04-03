<!--
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/2 11:12
 -->
<template>
    <div id="female">
        <div class="t-left p10 pb10">
            <h3>女生</h3>
            <p><i></i>作品类型</p>
            <el-radio-group v-for="item in majorList" size="mini" v-model="defaultMajor" class="p5"
                            @change="changeMajor(item)" :key="item.id">
                <el-radio-button :label="item.major"></el-radio-button>
            </el-radio-group>
            <p v-show="minsList.length !== 0"><i></i>具体类型</p>
            <el-radio-group v-for="item in minsList" size="mini" v-model="defaultMins" class="p5"
                            @change="changeMins(item)" :key="item.id">
                <el-radio-button :label="item"></el-radio-button>
            </el-radio-group>
            <p><i></i>更多筛选</p>
            <el-radio-group v-for="item in typeList" size="mini" v-model="defaultType.value" class="p5"
                            @change="changeType(item)" :key="item.id">
                <el-radio-button :label="item.value"></el-radio-button>
            </el-radio-group>
        </div>
        <hr>
        <el-row>
            <el-col :span="12" v-for="item in booksData" class="booklist" :key="item.id">
                <div>
                    <img :src="'http://statics.zhuishushenqi.com' + item.cover" :alt="item.title" class="img cursor" @click="getBookinfo(item)">
                    <div class="right">
                        <p class="name cursor" @click="getBookinfo(item)">{{item.title}}</p>
                        <p class="author">{{item.author + " | " + item.majorCate}}</p>
                        <p class="desc">{{item.shortIntro}}</p>
                        <p class="popularity">
                            <span style="color: #d82626">{{item.latelyFollower}}</span>人气 |
                            <span style="color: #d82626">{{item.retentionRatio}}</span>读者存留
                        </p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <hr>
        <el-pagination @size-change="maleSizeChange" @current-change="maleCurrentChange" :current-page="maleCurrentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="totalData">
        </el-pagination>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Categorylist, Categorylistbook } from '@/axios/api';

@Component({
    name: 'Female'
})
export default class Female extends Vue {
    private majorList = [];
    private defaultMajor = '';
    private minsList = [];
    private defaultMins = '';
    private typeList = [
        {
            label: 'hot',
            value: '热门'
        },
        {
            label: 'new',
            value: '新书'
        },
        {
            label: 'reputation',
            value: '好评'
        },
        {
            label: 'over',
            value: '完结'
        }
    ];

    private defaultType = {
        label: 'hot',
        value: '热门'
    };

    private bookgender = 'female';
    private booksData = [];
    private start = 0;
    private limit = 10;
    private totalData = 0;
    private maleCurrentPage = 1

    // 获取小类别下的分类
    private changeMajor (item: any): void {
        this.minsList = item.mins;
        this.defaultMins = item.mins[0];
        this.getCategorylistbook();
    }

    // 根据小分类获取小说列表
    private changeMins (item: any): void {
        this.defaultMins = item;
        this.getCategorylistbook();
    }

    // 根据更多筛选获取小说列表
    private changeType (item: any): void {
        this.defaultType.label = item.label;
        this.getCategorylistbook();
    }

    // 根据分类获取小说列表
    private getCategorylistbook (): void {
        let parmas = {
            gender: this.bookgender,
            type: this.defaultType.label,
            major: this.defaultMajor,
            minor: this.defaultMins,
            start: this.start,
            limit: this.limit
        };
        Categorylistbook(parmas).then(res => {
            if (res.ok === true) {
                this.booksData = res.books;
                this.totalData = res.total;
            }
        });
    }

    // 获取小说信息
    private getBookinfo (item: any): void {
        this.$router.push('/bookinfo/' + item._id);
    }

    // 分页每页显示
    private maleSizeChange (val: number): void {
        this.limit = val;
        this.getCategorylistbook();
    }

    // 分页跳转页数
    private maleCurrentChange (val: number): void {
        this.start = val - 1;
        this.getCategorylistbook();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    mounted (): void {
        // 获取分类下小类别
        Categorylist().then(res => {
            if (res.ok === true) {
                this.majorList = res.female;
                this.defaultMajor = res.female[0].major;
                this.changeMajor(res.female[0]);
            }
        });
    }
}
</script>
<style lang="scss" scoped>
    #female {
        .booklist {
            padding: 10px;
            font-size: 14px;
        }

        .img {
            float: left;
            width: 90px;
            height: 120px;
            border: 1px solid #ebebeb;
            box-shadow: 2px 4px 6px #bbb;
        }

        .right {
            height: 120px;
            margin-left: 105px;
        }

        .right p {
            margin: 0px;
            text-align: left;
        }

        .name {
            height: 22px;
            line-height: 22px;
            font-weight: 700;
        }

        .author {
            height: 28px;
            line-height: 28px;
        }

        .desc {
            height: 40px;
            text-overflow: ellipsis;
            overflow: hidden
        }

        .popularity {
            height: 28px;
            line-height: 28px;
            margin-top: 10px !important
        }
    }
</style>
