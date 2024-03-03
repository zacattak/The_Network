<template>

<form v-if="account.id" @submit.prevent="createPost()">

<div class="mb-3">
  <label for="imgUrl">ImgUrl</label>

  <input v-model="editablePostData.imgUrl" id="imgUrl" name="imgUrl" type="url" required maxlength="500">
</div>

<div class="mb-3">
  <label for="body">Body</label>
  <input v-model="editablePostData.body" id="body" name="body" type="text" maxlength="500">
</div>



<div class="text-end mb-3">
  <button type="submit">Submit</button>
</div>
</form>

</template>


<script>

import {computed, ref} from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import {postsService} from '../services/PostsService.js'
import{AppState} from '../AppState.js'


export default {
    setup(){

        const editablePostData = ref ({})



        return {}
        editablePostData,

        account: computed (() => AppState.account),

        async createPost(){
            try {
                logger.log('creating post', editablePostData.value)
                await postsService.createPost(editablePostData.value)
                editablePostData.value = {}
            } catch (error) {
                Pop.error(error)
                
            }
        }

    }
}
</script>


<style lang="scss" scoped>

label {
  display: block;
}

</style>