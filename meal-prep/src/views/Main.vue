<template>
  <div class="main">    
    <div class="main_panel">
      <div class="main_panel_header">
        <div>Обработка заказа</div> 
        <div>Заказ {{currentOrder.id}}</div>
      </div>

      <div class="main_panel_aside">
        <Orders :orders="orders" :key="Math.random()"/>
      </div>
      
      <div class="main_panel_body">
        <CurrentOrder :currentOrder="currentOrder" v-show="currentOrder.id"/> 
      </div>
    
    </div>
    <Notification/>
  </div>

</template>


<script>
import Orders from "@/components/Orders.vue";
import CurrentOrder from "@/components/CurrentOrder.vue";
import Notification from "@/components/Notification.vue";
import { HTTP } from '@/request/http-common'
import { exit } from '@/request/exit';
import { deleteCookie, getCookie, setCookie } from '@/request/cookie';
import { mapState, mapGetters } from 'vuex';


export default {
  name: "Main",
  components: {
    Orders,
    CurrentOrder,
    Notification,
  },
  computed: {
    ...mapState(['orders', 'currentOrder']),
  },
  mounted() {
    const currentToken = getCookie('Authorization');
    if (currentToken) {
      setCookie('Authorization', currentToken, 'expires=86400');  
      setInterval(() => { this.$store.dispatch("loadData") }, 10000);
    }

  },
  created() {
    this.$store.dispatch("loadData");
  },
};
</script>

<style scoped lang="less">
  .main {

    &_panel {
      display:flex;
      flex-flow: row wrap;
      min-width: 880px;

      & > * {
        flex: 1 100%;
      }
      
      &_header {
        background: #E5E7E8;
        display: flex;
        position: fixed;
        width: 100%;
        // justify-content: space-between;
        align-items: center;
        height: 65px;
        padding: 0 15px 0 5px;
        border: 1px solid rgba(128, 128, 128, 0.2);

        & > div:first-child {
          margin-right: 45%;
        }
      }

      &_aside {
        background: #eaeaea;
        flex: 1;
        height: -webkit-calc(100% - 65px);
        height: -moz-calc(100% - 65px);
        height: calc(100% - 65px);
        overflow: auto;
        position: fixed;
        top: 65px;
        min-width: 220px;
        width:25%;
      }

      &_body {
        //flex: 3 0px;
        position: fixed;
        top: 65px;
        right: 0;
        min-width: 660px;
        width:75%;
        // position:relative;
      }
    }
  }
</style>