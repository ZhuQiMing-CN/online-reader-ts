<!--
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/1 16:57
 -->
<template>
    <div id="MainView">
        <header-view></header-view>
        <router-view></router-view>
    </div>
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
