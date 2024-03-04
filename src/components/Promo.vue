<template>

<div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1 class="m-3">{{ promo.banner }}</h1>
      </div>
    </section>
  </div>

</template>


<script>

import { onMounted } from 'vue';
import Pop from '../utils/Pop.js'
import { promoService } from '../services/PromoService.js'
import { AppState } from '../AppState.js';
import { Promo } from '../models/Promo.js';


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
        
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>