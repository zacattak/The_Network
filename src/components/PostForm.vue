<template>

<form @submit.prevent="createPost()">

<div class="mb-3">
  <label for="postImgUrl">ImgUrl</label>

  <input v-model="editablePostData.imgUrl" id="postImgUrl" name="imgUrl" type="url" required maxlength="500">
</div>

<div class="mb-3">
  <label for="postBody">Body</label>
  <input v-model="editablePostData.body" id="postBody" name="body" type="text" required minlength="1"
    maxlength="500">
</div>



<div class="text-end mb-3">
  <button type="submit">Submit</button>
</div>
</form>

</template>


<script>

import {ref} from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import {postsService} from '../services/PostsService.js'


export default {
    setup(){

        const editablePostData = ref ({})



        return {}
        editablePostData,

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

</style>