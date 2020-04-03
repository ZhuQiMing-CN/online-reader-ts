<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'App'
})
export default class App extends Vue {
    created () {
        // 在页面加载时读取localStorage里的状态信息
        let bookMsg: any = localStorage.getItem("bookMsg");
        bookMsg && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(bookMsg)));

        // 在页面刷新时将vuex里的信息保存到localStorage里
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("bookMsg", JSON.stringify(this.$store.state));
        });
    }
}
</script>

<style lang="scss">
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
</style>
