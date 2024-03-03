import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
    async getPosts() {
        const response = await api.get('/api/posts')
        logger.log('posts had', response.data)
        const newPosts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = newPosts
    }
    // setActiveProfile(post) {
    //     // logger.log('profile activated', data)
    //     AppState.activeProfile = post
    // }

    async getPostsByCreatorId(profileId) {
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('GOT POSTS', response.data)
        const newPosts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = newPosts
    }

    setActiveProfile(post) {
        AppState.activeProfile = post
    }



}

export const postsService = new PostsService()