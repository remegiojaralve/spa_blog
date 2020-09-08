import axios from 'axios'

const state = {
  authKey: localStorage.getItem('authenticate') || null
}

const getters = {
  isLogined: () => { return state.authKey !== null }
}

const actions = {
  loginUser ({ commit }, payload) {
    return new Promise((resolve) => {
      const data = JSON.stringify({
        query: `mutation {\n  authenticate(\n    email: "${payload.logEmail}",\n    password: "${payload.logPassword}"\n  )\n}`,
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
      axios(config)
        .then(function (response) {
          const key = response.data.data.authenticate
          if (key.length !== 0) {
            localStorage.setItem('authenticate', key)
            commit('setAuthKey', key)
          }
          resolve(key)
        })
    })
  },
  logoutUser (context) {
    if (context.getters.isLogined) {
      const config = {
        method: 'post',
        url: 'http://localhost:4000/',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      axios(config)
        .then(function (response) {
          localStorage.removeItem('authenticate')
          context.commit('logOut')
        })
        .catch(function (error) {
          localStorage.removeItem('authenticate')
          context.commit('logOut')
          console.log(error)
        })
    }
  },
  registerUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        query: `mutation {\n  register(\n    email: "${payload.regEmail}",\n    password: "${payload.regPassword}"\n  )\n}`,
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
      axios(config)
        .then(function (response) {
          console.log(response.data.data)
          resolve(response.data.data.register)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  }
}

const mutations = {
  setAuthKey: (state, authKey) => (state.authKey = authKey),
  logOut: (state) => (state.authKey = null)
}

export default {
  state,
  getters,
  actions,
  mutations
}
