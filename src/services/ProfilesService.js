import { api } from "./AxiosService.js"

class ProfilesService {
    async getProfilesById(profilesId) {
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('GOT PROFILE', response.data)
        const newProfile = new Profile(response.data)
        AppState.activeProfile = newProfile
    }
}

export const profilesService = new ProfilesService()