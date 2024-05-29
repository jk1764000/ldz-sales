<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">欢迎</div> -->
    <img class="homePage" src="https://srm.sdyanxitang.com/ELSServer_YXT/images/homePage.png" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.homePage{
  display: block;
  width: 688px;
  height: 695px;
  margin:50px auto 0;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
