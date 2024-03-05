<template>

<div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <!-- <h1 class="m-3">{{ promos.banner }}</h1> -->
        <div v-for="promo in promos" :key="promo.linkURL" class="col-md-4"><img :src="promo.banner" alt=""></div>
      </div>
    </section>
  </div>

</template>


<script>

import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js'
import { promoService } from '../services/PromoService.js'

import { AppState } from '../AppState.js';




export default {
    setup(){

        async function getPromos(){
            try {
                await promoService.getPromos()
            } catch (error) {
                Pop.error(error)
            }
        }

        onMounted(()=>{
            getPromos()
        })
        
        return {
            promos: computed(()=>AppState.promos),
        }
    }
}
</script>


<style lang="scss" scoped>

</style>