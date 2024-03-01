<template>
    <div class="card mb-3">
        <img :src="post.imgUrl" class="card-img-top" :alt="post.creator">
        <div class="card-body d-flex justify-content-between">
            <div>
                <p class="card-title fs-5">{{ post.body }}</p>
                <button class="btn btn-secondary">😉</button>
            </div>
            <!-- <img class="" :src="post.imgUrl" :alt="post.creator"> -->
        </div>
    </div>
</template>


<script>
import { Post } from '../models/Post';


export default {
    props: {
        post: { type: Post, required: true }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>