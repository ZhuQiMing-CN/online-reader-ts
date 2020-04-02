<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p>{{info}}</p>
        <p>{{fullName}}</p>
        <button @click="setInfo">setInfo</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    name: 'About'
})
export default class About extends Vue {
    // data
    private info = '';
    private firstName = 'Li';
    private lastName = 'Lei'

    // computed
    get fullName (): string {
        return this.firstName + this.lastName;
    }

    // methods
    private setInfo (): void {
        this.info = '我是info';
    }

    mounted (): void {
        // console.log('hello');
    }
}
</script>

<style lang="scss" scoped>
.about {
    background: #fff;
}
</style>
