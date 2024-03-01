<template>
    <div class="card mb-3">
        <img :src="post.imgUrl" class="card-img-top" :alt="post.creator">
        <div class="card-body d-flex justify-content-between">
            <div>
                <p class="card-title fs-5">{{ post.body }}</p>

                <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">

                    <button @click="setActiveProfile()" class="btn btn-secondary">

                        😉 Open Profile

                    </button>

                </router-link>

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


<style lang="scss" scoped></style>