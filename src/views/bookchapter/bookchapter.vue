<!--
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/3 11:20
 -->
<template>
    <div class="content chapter">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumbs">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/bookinfo/' + bookId }">{{bookTitle}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{bookData.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button-group class="float-right">
            <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="backChapter()">上一章</el-button>
            <el-button type="primary" icon="el-icon-tickets" size="small" @click="backBookinfo()">章节列表</el-button>
            <el-button type="primary" size="small" @click="nextChapter()">下一章<i
                class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        <p class="clear-both bb">{{bookData.title}}</p>
        <pre v-if="imagesData.length == 0">
            {{bookData.cpContent || bookData.body}}
        </pre>
        <div v-if="imagesData.length > 0">
            <p v-for="(item, key) in imagesData" :key="key">
                <img :src="item" width="100%">
            </p>
        </div>
        <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="backChapter()">上一章</el-button>
        <el-button type="primary" class="float-right" size="small" @click="nextChapter()">下一章<i
            class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Bookchapter, Bookcatalog } from '@/axios/api';

interface BookData {
    [propName: string]: any;
}

@Component({
    name: 'BookChapter'
})
export default class BookChapter extends Vue {
    private bookId = '';
    private bookTitle = '';
    private bookData: BookData = [];
    private mybookData: any;
    private chaptersData: any;
    private chapterIndex = 0;
    private imagesData = [];

    // 获取小说目录列表
    private getBookSources () {
        let bookShelfs = this.$store.state.bookShelf;
        this.bookId = this.$route.params.bookId;
        this.mybookData = bookShelfs.filter((item: any) => item.id === this.$route.params.bookId);
        this.bookTitle = this.mybookData[0].title;
        let parmas = this.mybookData[0].sourceId;
        Bookcatalog(parmas).then(res => {
            this.chaptersData = res.chapters;
            if (this.mybookData[0].readlink === '') {
                this.mybookData[0].readlink = res.chapters[0].link;
            }
            let parmas = this.mybookData[0].readlink;
            Bookchapter(parmas).then(res => {
                if (res.ok === true) {
                    this.bookData = res.chapter;
                    if (this.bookData.isVip) {
                        this.$alert('该章节为正版源，请换源后重试', '警告', {
                            confirmButtonText: '确定',
                            type: 'warning',
                            callback: () => {
                                this.$router.push('/bookinfo/' + this.bookId);
                            }
                        });
                    }
                    // 漫画
                    if (res.chapter.images) {
                        this.imagesData = res.chapter.images.split(',');
                    }
                }
            });
            this.chapterIndex = this.chaptersData.findIndex((item: any) => item.link === this.mybookData[0].readlink);
        });
    }

    // 下一章小说
    private nextChapter () {
        let bookShelfs = this.$store.state.bookShelf;
        if (this.chapterIndex >= this.chaptersData.length - 1) {
            this.$message({
                message: '这已经是最新的章节了哦~',
                type: 'warning',
                duration: 1000
            });
            return;
        }
        let parmas = this.chaptersData[this.chapterIndex += 1].link;
        Bookchapter(parmas).then(res => {
            if (res.ok === true) {
                this.bookData = res.chapter;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                if (this.bookData.isVip) {
                    this.$alert('该章节为正版源，请换源后重试', '警告', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: () => {
                            this.$router.push('/bookinfo/' + this.bookId);
                        }
                    });
                }
                // 漫画
                if (res.chapter.images) {
                    this.imagesData = res.chapter.images.split(',');
                }
                if (bookShelfs.findIndex((item: any) => item.id === this.$route.params.bookId) !== -1) {
                    bookShelfs[bookShelfs.findIndex((item: any) => item.id === this.$route.params.bookId)].readlink = parmas;
                    bookShelfs[bookShelfs.findIndex((item: any) => item.id === this.$route.params.bookId)].readtitle = this.bookData.title;
                    this.$store.commit('setBookShelf', bookShelfs);
                }
            }
        });
    }

    // 上一章小说
    private backChapter () {
        let bookShelfs = this.$store.state.bookShelf;
        if (this.chapterIndex < 1) {
            this.$message({
                message: '这已经是第一章节了哦~',
                type: 'warning',
                duration: 1000
            });
            return;
        }
        let parmas = this.chaptersData[this.chapterIndex -= 1].link;
        Bookchapter(parmas).then(res => {
            if (res.ok === true) {
                this.bookData = res.chapter;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                if (this.bookData.isVip) {
                    this.$alert('该章节为正版源，请换源后重试', '警告', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: () => {
                            this.$router.push('/bookinfo/' + this.bookId);
                        }
                    });
                }
                // 漫画
                if (res.chapter.images) {
                    this.imagesData = res.chapter.images.split(',');
                }
                if (bookShelfs.findIndex((item: any) => item.id === this.$route.params.bookId) !== -1) {
                    bookShelfs[bookShelfs.findIndex((item: any) => item.id === this.$route.params.bookId)].readlink = parmas;
                    bookShelfs[bookShelfs.findIndex((item: any) => item.id === this.$route.params.bookId)].readtitle = this.bookData.title;
                    this.$store.commit('setBookShelf', bookShelfs);
                }
            }
        });
    }

    // 返回章节列表
    private backBookinfo () {
        this.$router.push('/bookinfo/' + this.bookId);
    }

    mounted () {
        this.getBookSources();
    }
}
</script>
<style lang="scss" scoped>
    .chapter {
        text-align: left;
        color: #755927;
        padding: 10px 10px 20px;
        line-height: 32px;
        background-color: #e9e6d0;
    }

    .chapter pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .breadcrumbs {
        padding: 8px 0px;
    }
</style>
