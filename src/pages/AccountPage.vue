<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <section class="row">
      <div class="col-6 m-auto">

        <form @submit.prevent="updateAccount()">

          <div class="mb-3">
            <label for="name">Name</label>
            <input v-model="editableAccountData.name" required class="w-100" type="text" id="name">
          </div>

          
          <div class="mb-3">
            <label for="bio">Bio</label>
            <textarea v-model="editableAccountData.bio" id="bio" cols="20" class="w-100"></textarea>
          </div>



          <div class="mb-3">
            <label for="picture">Picture</label>
            <input v-model="editableAccountData.picture" required class="w-100" type="text" id="picture">
          </div>

          <div class="mb-3">
            <label for="coverImg">Cover Image</label>
            <input v-model="editableAccountData.coverImg" class="w-100" type="text" id="coverImg">
          </div>


          <div class="mb-3">
            <label for="email">Email</label>
            <input v-model="editableAccountData.email" id="email" class="w-100">
          </div>



          <div class="mb-3">
            <label for="github">github</label>
            <input v-model="editableAccountData.github" class="w-100 link" type="text" id="github">
          </div>



          <div>
            <label for="resume">Resume</label>
            <input v-model="editableResumeData" id="resume" class="w-100">
          </div>

          <div>
            <label for="class">Class</label>
            <input v-model="editableClassData" id="class" class="w-100">
          </div>

          <div class="mb-3">
            <label for="graduated">Graduated?</label>
            <input v-model="editableAccountData.graduated" type="checkbox" id="graduated">
          </div>

          <button class="btn btn-success">Update Account</button>

        </form>

      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { accountService } from '../services/AccountService.js';

export default {
  setup() {
  
    const account = computed(() => AppState.account)
    const editableAccountData = ref({})
    
    watch(account, () => { editableAccountData.value = { ...account.value } }, { immediate: true })

    return {
      editableAccountData,
      account,
      async updateAccount() {
        try {
          await accountService.updateAccount(editableAccountData.value)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
}

label {
  display: block;
}


</style>
