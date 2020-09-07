import axios from 'axios'

const state = {
  postList: [],
  latestPosts: [],
  singlePost: {},
  totalPost: 0
}

const getters = {
  allPosts: (state) => state.postList,
  allLatestPosts: (state) => state.latestPosts,
  postDetail: (state) => state.singlePost,
  getTotalPost: (state) => state.totalPost
}

const actions = {
  async fetchTotalPost ({ commit }) {
    const data = JSON.stringify({
      query: '{\n  posts{\n    id, title, content, createdAt,image , comments {\n      id\n    }\n  }\n}',
      variables: {}
    })
    const config = {
      method: 'post',
      url: 'http://localhost:4000/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    await axios(config)
      .then(function (response) {
        commit('setTotalPost', response.data.data.posts.length)
      })
  },
  async fetchPosts ({ commit }, postTotal) {
    const data = JSON.stringify({
      query: `query{\n  posts(\n    pagination: {\n      limit: ${postTotal},\n      offset: 0\n    }\n  ){\n    id, title, content, image, createdAt, comments {\n      id, content\n    }\n  }\n}`,
      variables: {}
    })
    const config = {
      method: 'post',
      url: 'http://localhost:4000/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    await axios(config)
      .then(function (response) {
        commit('setPosts', response.data.data.posts)
      })
  },
  async fetchLatestPosts ({ commit }) {
    const data = JSON.stringify({
      query: 'query{\n  posts(\n    pagination: {\n      limit: 3,\n      offset: 0\n    }\n  ){\n    id, title, content, image, createdAt, comments {\n      id, content\n    }\n  }\n}',
      variables: {}
    })
    const config = {
      method: 'post',
      url: 'http://localhost:4000/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    await axios(config)
      .then(function (response) {
        commit('setLatestPosts', response.data.data.posts)
      })
  },
  async fetchSinglePost ({ commit }, id) {
    const data = JSON.stringify({
      query: `query{\n  post(\n   id: ${id}\n  ){\n    id, title, content, image, createdAt, comments {\n      id, content, createdAt\n    }\n  }\n}`,
      variables: {}
    })
    const config = {
      method: 'post',
      url: 'http://localhost:4000/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    await axios(config)
      .then(response => {
        const postDetail = response.data.data.post
        commit('singlePost', postDetail)
      })
  },
  async addPost (context, payload) {
    const data = JSON.stringify({
      query: `mutation {\n  addPost(\n post: {\n title: "${payload.title}",\n content: "${payload.content}",\n image: "${payload.image}"\n }\n ) {\n id, title, content\n  }\n}`,
      variables: {}
    })
    const config = {
      method: 'post',
      url: 'http://localhost:4000/',
      headers: {
        'authenticate': localStorage.getItem('authenticate').value, // eslint-disable-line quote-props
        'Content-Type': 'application/json'
      },
      data: data
    }
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        context.commit('newPost', response.data.payload)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const mutations = {
  setTotalPost: (state, totalPost) => (state.totalPost = totalPost),
  setPosts: (state, postList) => (state.postList = postList),
  setLatestPosts: (state, latestPosts) => (state.latestPosts = latestPosts),
  singlePost: (state, singlePost) => (state.singlePost = singlePost),
  setLoadMorePosts: (state, loadMorePosts) => (state.loadMorePosts = loadMorePosts),
  newPost: (state, payload) => {
    const newPost = {
      title: payload.title,
      content: payload.content,
      image: payload.image
    }
    state.postList.push(newPost)
    console.log(state.postList.length)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
