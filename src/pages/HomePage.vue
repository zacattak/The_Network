<template>
  <div class="container mt-3">

    <section class="row">

      <div class="col-12">

        <div v-for="post in posts" :key="post.id" class="">

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





          <!-- iteratize me capn -->

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




export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      getPosts()
    })

    return {
      posts: computed(() => AppState.posts)
    }
  }
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
