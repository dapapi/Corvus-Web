<template>
    <div class="messages-container">
        <Header />
        <Banner />
        <div class="messages-main-container">
            <Main v-for="k in 5"
                :key=k
                :message-data="messageData"/>
        </div>

    </div>
</template>

<script>
import Header from './messagesHeader.vue';
import Banner from './messagesBanner.vue';
import Main from './messagesMain.vue';

export default {
  name: 'messagesIndex',
  components: {
    Header, Banner, Main,
  },
  data() {
    return {
      messageData: {},
    };
  },
};
</script>

<style>
.messages-container{
    position: relative;
    left: 120px;
    top: 85px;
    background-color: #f0f0f0;
    width: 1835px;
    height: 1234px;
}
.messages-main{
    width: 1751px;
    height: 924px;
    background-color: #fff;
    margin-left: 40px;
    overflow: scroll;
}
.messages-main-line{
    height: 0;
    width: 1311px;
    border-bottom: 3px #cecece dashed;
    margin: 19px 144px 0 43px;
}
</style>
