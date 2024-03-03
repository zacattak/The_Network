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

                <p>{{ post.likeIds.length }}</p>

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


export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(props) {
        return {
            setActiveProfile() {
                logger.log(props.post)
                postsService.setActiveProfile(props.post)
            }
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