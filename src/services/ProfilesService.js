import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { Profile } from "../models/Profile.js"

class ProfilesService {
    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('GOT PROFILE', response.data)
        const newProfile = new Profile(response.data)
        AppState.activeProfile = newProfile

    }

    async changeProfilePage(pageNumber) {
        const response = await api.get(`api/posts?creatorId=${creatorId}&page=${pageNumber}`)
        logger.log('changing page', response.data)
        const newPosts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = newPosts
        AppState.currentProfilePage = response.data.page
        AppState.totalProfilePages = response.data.totalPages


    }
}

export const profilesService = new ProfilesService()