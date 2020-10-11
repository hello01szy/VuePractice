<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name:'app',
  data(){
    return {
    }
  }
}
</script>
<style lang="css">
  #app{
    width: 100%;
    height: 100%;
    background-image: url(./assets/bg3.jpg);
    background-size: cover
  }
</style>
