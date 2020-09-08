<template>
  <div id="app">
    <div class="container">
      <Header
        :showForm="showForm"
        :text="text"
        :toggleForm="toggleForm"
        :hideForm="hideForm"
        :logOut="logoutUser"
      />
    </div>
    <router-view/>
    <a href="#" v-show="visible" class="to-top">
      <div class="arrow-up"></div>
      <p>TOP</p>
    </a>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      visible: false,
      visibleOffset: 600,
      showForm: false,
      text: 'LOGIN'
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    // window.smoothscroll = () => {
    //   const currenScroll = document.documentElement.scrollTop || document.body.scrollTop
    //   if (currenScroll > 0) {
    //     window.requestAnimationFrame(window.smoothscroll)
    //     window.scrollTo(0, Math.floor(currenScroll - (currenScroll / 2)))
    //   }
    // }
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed () {
    window.addEventListener('scroll', this.catchScroll)
  },
  // computed: {
  //   ...mapActions(['logoutUser'])
  // },
  methods: {
    ...mapActions(['logoutUser']),
    catchScroll () {
      this.visible = (window.pageYOffset > parseInt(this.visibleOffset))
    },
    toggleForm () {
      if (this.showForm) {
        this.showForm = false
        this.text = 'LOGIN'
      } else {
        this.showForm = true
        this.text = 'CLOSE'
      }
    },
    hideForm () {
      this.showForm = false
      this.text = 'LOGIN'
    },
    logOut () {
      this.logoutUser()
    }
    // backToTop () {
    //   window.smoothscroll()
    // }
  }
}
</script>

<style lang="scss">
* {
  box-sizing:border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 1120px;
  margin: auto;
}

.post-link {
  text-decoration: none;
  color: black;
  width: 100%;
  height: 100%;
}

.to-top {
  position: fixed;
  cursor: pointer;
  width: 79px;
  height: 78px;
  background-color: white;
  bottom: 99px;
  right: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  .arrow-up {
    width: 14.75px;
    height: 15.44px;
    position: relative;
    border-style: solid;
    border-color: black;
    border-width: 3px 3px 0 0;
    transform: rotate(-45deg);
  }

  p {
    color: black;
    font-weight: bold;
    margin-top: 5px;
    line-height: 1;
  }
}

.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

.post-input-comment-container {
  text-align: right;
  margin-top: 40px;
}

.post-input-comment {
  width: 100%;
  height: 200px;
  padding: 20px;
  color: black;
  outline: none;
  border: 1px solid black;
  font-style: italic;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
}

.post-input-comment-submit {
  width: 200px;
  padding: 20px;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 20px;
  outline: none;
  border: 0;
  cursor: pointer;
  margin-top: 30px;
}
</style>
