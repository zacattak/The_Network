<template>
    <div class="container">
    <section v-if="profile" class="row my-3">
      <div class="col-12">
        <div class="col-12 text-center">
        <img class="profile-picture" :src="profile.picture" :alt="profile.name">
        <img class="profile-cover-img" :src="profile.coverImg" :alt="profile.name">
      </div>
      <div class="col-12">
        <h1><i v-if="profile.graduated" class="mdi mdi-bird"></i> {{ profile.name }}</h1>
        <p>{{ profile.bio }}</p>
        <p>linkedin: {{ profile.linkedin }}</p>
        <p>github: {{ profile.github }}</p>
        <p>class: {{ profile.class }}</p>
      </div>
      </div>
    </section>

    <div class="col-12">
        <h1>Posts</h1>
      </div>
      <div class="col-12 d-flex align-items-center my-2">
        <button class="btn btn-outline-dark">Previous</button>
        <p class="mb-0 mx-3 fs-4">Page {{ currentPage }} of {{ totalPages }}</p>
        <button @click="changeProfilePage(currentPage + 1)" class="btn btn-outline-dark"
          :disabled="currentPage == totalPages || currentPage == 500">>Next</button>
      </div>

    <section class="row">
        <div v-for="profilePost in posts" class="col-md-4">
            <PostCard :post="profilePost" />

        </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';


export default {
    setup() {
        const route = useRoute()

        async function getProfileById(){
            try {
                const profileId = route.params.profileId
                logger.log('Id from route params', profileId)
                await profilesService.getProfileById(profileId)

            } catch (error) {
                Pop.error(error)
            }
        }

        async function getPostsByCreatorId(){
            try {
                const profileId = route.params.profileId
                await postsService.getPostsByCreatorId(profileId)
            } catch (error) {
                Pop.error(error)
            }
        }

        onMounted(()=>{
            getProfileById()
            getPostsByCreatorId()
        
        })

        return {
            profile: computed(()=> AppState.activeProfile),
            posts: computed(()=> AppState.posts),
            currentPage: computed(()=> AppState.currentPage),
            totalPages: computed(() => AppState.totalPages),

            async changeProfilePage(pageNumber){
                try {
                    await profilesService.changeProfilePage(pageNumber)
                } catch (error) {
                    Pop.error(error)
                }
            }

        }

    },
    components: { PostCard }
}
</script>


<style lang="scss" scoped>

.profile-picture {
  height: 30vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}

.profile-cover-img {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  transform: translateY(-12vh);
  margin-bottom: -12vh;
}

</style>