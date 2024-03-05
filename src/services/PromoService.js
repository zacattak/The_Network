import { logger } from "../utils/Logger";
import { api } from "./AxiosService";
import { AppState } from "../AppState";
import { Promo } from "../models/Promo";

class PromoService {
    async getPromos() {
        const response = await api.get('api/ads')
        logger.log('got ads', response.data)
        const newPromos = response.data
        AppState.promos = newPromos
    }
}

export const promoService = new PromoService()