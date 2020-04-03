<!--
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/3 13:30
 -->
<template>
    <div id="rmale">
        <div class="t-left p10 pb10">
            <h3>男生</h3>
            <p><i></i>作品类型</p>
            <el-radio-group v-for="item in rankList" size="mini" v-model="defaultRank" class="p5"
                            @change="changeRank(item)" :key="item.id">
                <el-radio-button :label="item.title"></el-radio-button>
            </el-radio-group>
            <p><i></i>更多筛选</p>
            <el-radio-group size="mini" @change="changeType(typeList._id)" v-model="defaultType" class="p5">
                <el-radio-button label="typeList._id" v-if="typeList._id">周排行榜</el-radio-button>
            </el-radio-group>
            <el-radio-group size="mini" @change="changeType(typeList.monthRank)" v-model="defaultType" class="p5">
                <el-radio-button label="typeList.monthRank" v-if="typeList.monthRank">月排行榜</el-radio-button>
            </el-radio-group>
            <el-radio-group size="mini" @change="changeType(typeList.totalRank)" v-model="defaultType" class="p5">
                <el-radio-button label="typeList.totalRank" v-if="typeList.totalRank">总排行榜</el-radio-button>
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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Rankcategory, Ranklistbook } from '@/axios/api';

interface RankList {
    [propName: string]: any;
}

@Component({
    name: 'Rmale'
})
export default class Rmale extends Vue {
    private rankList: RankList = [];
    private defaultRank = '';
    private defaultType = '';
    private rankId = '';
    private typeList = [];
    private booksData = []

    // 获取排行榜类型
    getRanklist () {
        Rankcategory().then(res => {
            if (res.ok === true) {
                this.rankList = res.male;
                this.defaultRank = this.rankList[0].title;
                this.changeRank(this.rankList[0]);
            }
        });
    }

    // 根据排行榜获取小说列表
    changeRank (item: any) {
        this.rankId = item._id;
        this.typeList = item;
        this.defaultType = '';
        this.getRanklistbook();
    }

    // 根据更多筛选获取小说列表
    changeType (item: string) {
        this.rankId = item;
        this.getRanklistbook();
    }

    // 获取排行榜小说
    getRanklistbook () {
        let parmas = this.rankId;
        Ranklistbook(parmas).then(res => {
            if (res.ok === true) {
                this.booksData = res.ranking.books;
            }
        });
    }

    // 获取小说信息
    getBookinfo (item: any) {
        this.$router.push('/bookinfo/' + item._id);
    }

    mounted () {
        this.getRanklist();
    }
}
</script>
<style lang="scss" scoped>
    #rmale {
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
