<template>
  <div>
    <TradeNotification v-if = "userNotifications && userNotifications.length"
                       style = "width: 40%; margin: 0 auto; margin-top: 2%"
                       :key = "index"
                       v-for = "(notif, index) in userNotifications"
                       :notification = "notif">
    </TradeNotification>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TradeNotification from './TradeNotification.vue';

  export default {
      name: 'Notifications',
      components: { TradeNotification },
      data() {
        return {
            userNotifications: [],
        }
      },
      created() {
        this.fetchNotifications(this.getLoginUsername).then(() => {
          this.userNotifications = this.getNotifications.reverse();
        });
      },
      methods: {
        ...mapActions([
            'fetchNotifications'
        ]),
      },
      computed: {
        ...mapGetters([
            'getLoginUsername',
            'getNotifications',
        ])
      },
  }
</script>

<style scoped>

</style>
