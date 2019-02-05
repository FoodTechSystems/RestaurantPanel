<template>
  <div class="notification_wrapper" v-if="isOpen" @click="close">
    <div class="form">
      <h2>Новый заказ(ы)</h2>
    </div>

  </div>
</template>

<script>

export default {
  name: "Notification",
  computed: {
    isOpen() {
      return this.$store.getters.getOrdersState
    }
  },
  methods: {
    close() {
      this.$store.commit('updateOrdersState', false)
    }
  },
  
};
</script>

<style scoped lang="less">
  .notification {
    &_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100vh;
      background: #2ad270;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 56;
      cursor: pointer;
    }
  }
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 400px;
    min-height: 200px;
    padding: 10px;
    border-radius: 3px;
    position: relative;
    color: #fff;
  }

</style>
