export class Account {
  constructor(data) {
    this.id = data.id || data._id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.graduated = data.graduated
    this.resume = data.resume
    this.github = data.github
    this.class = data.class
  }
}
