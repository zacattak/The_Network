<template>
    <div class="container">
    <section v-if="profile" class="row my-3">
      <div class="col-12">
        <div class="col-12 text-center">
        <img class="profile-picture" :src="profile.picture" :alt="profile.name">
        <img class="profile-cover-img" :src="profile.coverImg" :alt="profile.name">
      </div>
      <div class="col-12">
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.bio }}</p>
      </div>
      </div>
    </section>
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
            posts: computed(()=> AppState.posts)
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