export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.likeIds = data.likeIds
        this.createdAt = data.createdAt
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.creatorImgUrl = data.creator.picture

    }
}

// const postData = 