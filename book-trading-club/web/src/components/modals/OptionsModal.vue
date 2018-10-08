<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close">x</span><br>
    <h3 slot = "header">{{ username }}</h3>
    <div slot = "body">
      <img src = "../../assets/profile_default.png"
           alt = "profile image"
           style = "width:50%;height:50%;border-radius:50px;margin-bottom: 10%"><br>
      <h4>Trade Requests: </h4>
      <TradeNotification v-if = "notifications && notifications.length"
                         :key = "index"
                         v-for = "(notif, index) in sortedNotifications.slice(0, 2)"
                         :notification = "notif">
      </TradeNotification>
      <a style = "float: right"
         v-if = "notifications && notifications.length > 2"
         @click.prevent = "goToNotificationsPage">show more
      </a><br>
      <EditModal v-if="showEditOptions" @close="showEditOptions = false"></EditModal>
    </div>
    <div slot = "footer" class = "text-center">
      <button type = "button" class = "btn btn-primary" @click.prevent = "editProfile">Edit Profile</button>
      <button type = "button" class = "btn btn-danger" @click.prevent = "logout">Logout</button>
    </div>
  </Modal>
</template>

<script>
  import Modal from './GenericModalStructure.vue';
  import EditModal from './EditProfileModal.vue';
  import TradeNotification from '../TradeNotification.vue';

  export default {
    name: 'OptionsModal',
    components: { Modal, EditModal, TradeNotification },
    props: ['logout', 'username', 'notifications'],
    data() {
      return {
        showEditOptions: false,
      }
    },
    methods: {
      goToNotificationsPage() {
        // todo implement
      },
      editProfile() {
        this.showEditOptions = true;
      },
      close() {
        this.$emit('close');
      }
    },
    computed: {
      sortedNotifications() {
        return this.notifications.reverse();
      }
    }
  }
</script>
