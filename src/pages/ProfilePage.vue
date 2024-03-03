<template>
    <div class="container">
    <section class="row">
      <div class="col-12">
        {{  }}
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

        onMounted(()=>{
            getProfileById()
        
        })
        return{
            profile: computed(()AppState.activeProfile)
        }

    }
}
</script>


<style lang="scss" scoped></style>