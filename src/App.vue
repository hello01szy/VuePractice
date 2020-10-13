<template>
  <div id="app" :class="decorate">
    <router-view/>
  </div>
</template>
<script>
export default {
  name:'app',
  data(){
    return {
      decorate:'bg0'
    }
  },
  methods:{
    getRandomBg(){
      this.decorate =  "bg"+Math.round(Math.random() * 2);
      console.log(this.decorate);
    }
  },
  created(){
    this.getRandomBg();
  }
}
</script>
<style lang="css">
  #app{
    width: 100%;
    height: 100%;
  }
  .bg0{
    background-image: url(./assets/bg1.jpg);
    background-size: cover
  }
  .bg1{
    background-image: url(./assets/bg2.jpg);
    background-size: cover
  }
  .bg2{
    background-image: url(./assets/bg3.jpg);
    background-size: cover
  }
</style>
