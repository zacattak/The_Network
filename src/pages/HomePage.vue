<template>
  <div>
    <div>


    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';




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
