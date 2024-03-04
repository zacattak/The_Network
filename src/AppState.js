import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  posts: [],

  activeProfile: null,

  activePost: null,

  currentPage: 0,

  totalPages: 0,

  currentProfilePage: 0,

  totalProfilePages: 0,

  promos: []
})
