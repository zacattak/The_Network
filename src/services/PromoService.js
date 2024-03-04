import { logger } from "../utils/Logger";
import { api } from "./AxiosService";
import { AppState } from "../AppState";

class PromoService {
    async getPromos() {
        const response = await api.get('api/ads')
        logger.log('got ads', response.data)
        const newPromos = response.data.promos.map(promoPOJO => new Promo(promoPOJO))
        AppState.promos = newPromos
    }
}

export const promoService = new PromoService()