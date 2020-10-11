<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .hello{
    width: 100%;
    height: 100%;
    background-image: url(~@/assets/welcome.png);
    background-size: 20%;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
