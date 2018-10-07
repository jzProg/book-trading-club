<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close">x</span><br>
    <h3 slot = "header">{{ username }}</h3>
    <div slot = "body">
      <img src = "../../assets/profile_default.png"
           alt = "profile image"
           style = "width:50%;height:50%;border-radius:50px;margin-bottom: 10%"><br>
      <div v-if="notifications && notifications.length" v-for="(notif, index) in notifications">
        User {{ notif.requester }} wants to trade your book with id: {{ notif.bookToTrade }} with book with id: {{ notif.bookToOffer }}
      </div>
      <button type = "button" class = "btn btn-primary" @click.prevent = "editProfile">Edit Profile</button>
      <button type = "button" class = "btn btn-danger" @click.prevent = "logout">Logout</button>
      <EditModal v-if="showEditOptions" @close="showEditOptions = false"></EditModal>
    </div>
  </Modal>
</template>

<script>
  import Modal from './GenericModalStructure.vue';
  import EditModal from './EditProfileModal.vue';

  export default {
    name: 'OptionsModal',
    components: { Modal, EditModal },
    props: ['logout', 'username', 'notifications'],
    data() {
      return {
        showEditOptions: false,
      }
    },
    methods: {
      editProfile() {
        this.showEditOptions = true;
      },
      close() {
          this.$emit('close');
      }
    }
  }
</script>
