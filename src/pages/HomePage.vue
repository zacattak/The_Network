<template>
  <div class="container mt-3">

    <section class="row justify-content-center">

      <div class="col-md-6">

        <div v-for="post in posts" :key="post.id" class="">







          <!-- iteratize me capn -->
          <PostCard :post="post" />
        </div>

      </div>


    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState.js'
import PostCard from '../components/PostCard.vue';




export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard }
}


</script>



<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
