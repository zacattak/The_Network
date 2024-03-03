<template>
    <div class="container">
    <section class="row">
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
            profile: computed(()=>AppState.activeProfile)
        }

    }
}
</script>


<style lang="scss" scoped></style>