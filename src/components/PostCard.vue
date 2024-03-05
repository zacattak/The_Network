<template>
    <div class="card mb-3">
        <img :src="post.imgUrl" class="card-img-top" :alt="post.likeIds"
        :title="`Created at ${post.createdAt}`">
        <div class="card-body d-flex justify-content-between">
            <div>
                
                <p class="card-title fs-5">{{ post.body }}</p>
              

                <div class="d-flex justify-content-between">

                <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">

                    <!-- <button @click="setActiveProfile()" class="btn btn-secondary">

                        😉 Open Profile

                    </button> -->
                    
                    <img class="creator-picture selectable" :src="post.creator.picture" :alt="post.creator.name" role="button" @click="setActiveProfile()"
                    :title="`Go to ${post.creator.name}'s profile!`">
                   

                </router-link>

                <p>Likes:{{ post.likeIds.length }}</p>

                <button v-if="post.creatorId == account.id" @click="deletePost()" class="btn btn-danger">Delete</button>

                </div>

            </div>
            <!-- <img class="" :src="post.imgUrl" :alt="post.creator"> -->
        </div>
    </div>
</template>


<script>
import { Post } from '../models/Post';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
// import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
// import { useRoute, useRouter } from 'vue-router';



export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(props) {

        // const route = useRoute()
    
        // const router = useRouter()


        // async function getPostById(){
        //     try {
        //         const postId = route.params.postId
        //         await postsService.getPostById(postId)
        //     } catch (error) {
        //         Pop.error(error)
        //     }
        // }
        // onMounted(()=>{
        //     getPostById()
        // })

        return {
      
            account: computed(() => AppState.account),


            setActiveProfile() {
                logger.log(props.post)
                postsService.setActiveProfile(props.post)
            },

            // async deletePost(){
            //     try {
            //     const wantsToDelete = await Pop.confirm('Wait a sec, are you sure?')
            //     if(!wantsToDelete){
            //         return
            //     }

            //     const postId = route.params.postId

            //     logger.log('deleting post', postId)
                
            //     await postsService.deletePost(postId)

            //     Pop.success('Post was deleted')
            //     router.push({ name: 'Posts' })

            //     } catch (error) {
            //         Pop.error(error)
            //     }
            // }
        }
    }
}
</script>


<style lang="scss" scoped>

.creator-picture {
  height: 8vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}



</style>