<template>
  <div class="container mt-3">

    <section class="row">
      <div class="col-12 my-2">
        <h1>Posts</h1>
      </div>

      <div class="col-12">
        <form @submit.prevent="searchPosts()">
          <div class="input-group mb-3">
            <input v-model="editableSearchQuery" required type="text" class="form-control" placeholder="Post Title"
            aria-label="Post" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
              Search <i class="mdi mdi-magnify"></i>
            </button>
          </div>
        </form>
      </div>

      <div v-if="savedSearch"  class="col-12 d-flex align-items-center">

        <p class="fs-3">Results: "{{ savedSearch }}"</p>
        <button class="fs-3" @click="clearSearch()">Clear</button>

      </div>


      <div class="col-12 d-flex align-items-center my-2">
        
        <button @click="changePage(currentPage - 1)" class="btn btn-outline-dark" :disabled="currentPage == 1">
          Previous
        </button>

        <p class="mb-0 mx-3 fs-4">Page {{ currentPage }} of {{ totalPages }}</p>
        
        <button @click="changePage(currentPage + 1)" class="btn btn-outline-dark"
          :disabled="currentPage == totalPages || currentPage == 500">
          Next
        </button>

      </div>

      <div class="col-12">
        <PostForm />
      </div>

    </section>

    <section class="row justify-content-center">

      <div class="col-md-7">

        <div v-for="post in posts" :key="post.id" class="">







          <!-- iteratize me capn -->
          <PostCard :post="post" />
        </div>

      </div>


    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState.js'
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue'
// import { Post } from '../models/Post';
import { logger } from '../utils/Logger';



export default {
  setup() {

    const editableSearchQuery = ref('')

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
      editableSearchQuery,
      posts: computed(() => AppState.posts),
      currentPage: computed(()=>AppState.currentPage),
      totalPages: computed(()=>AppState.totalPages),
      savedSearch: computed(()=>AppState.searchQuery),

      async changePage(pageNumber){
        try {
          await postsService.changePage(pageNumber)
        } catch (error) {
         Pop.error(error) 
        }

      },

      async searchPosts(){
        try {
          logger.log ('searching for:', editableSearchQuery.value)
          await postsService.searchPosts(editableSearchQuery.value)
        } catch (error) {
          Pop.error(error)
        }
      },

      async clearSearch(){
        try {
          editableSearchQuery.value = ''
          postsService.clearSearch()
          await getPosts()
        } catch (error) {
          Pop.error(error)
          
        }
      }
    };
  },
  components: { PostCard, PostForm }
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
