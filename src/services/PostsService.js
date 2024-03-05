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
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages



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


    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('CREATED POST', response.data)
        const newPost = new Post(response.data)
        AppState.posts.push(newPost)


    }

    async deletePost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        logger.log('POST GONE', response.data)


    }

    async changePage(pageNumber) {
        const response = await api.get(`api/posts?page=${pageNumber}`)
        logger.log('changing page', response.data)
        const newPosts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = newPosts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }




    async getPostById(postId) {
        const response = await api.get(`api/posts/${postId}`)
        logger.log('got post by id', response.data)
        const newPost = new Post(response.data)
        AppState.activePost = newPost
    }


    setActiveProfile(post) {
        AppState.activeProfile = post


    }

    async likePost(postId) {
        const response = await api.post(`api/posts/${postId}/like`)
        logger.log('liked post', response.data)

    }

    async searchPosts(searchQuery) {
        const response = await api.get(`/api/posts?query=${searchQuery}`)
        logger.log('searching', response.data)
        AppState.searchQuery = searchQuery
        const newPosts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = newPosts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

    clearSearch() {
        AppState.searchQuery = ''
    }


}

export const postsService = new PostsService()