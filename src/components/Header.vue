<template>
  <div class="nav">
    <div class="nav-inner">
      <router-link to="/">
        <img @click="hideForm" alt="Vue logo" src="@/assets/logo.png">
      </router-link>
      <router-link to="/">
        <p v-show="!isLogined" @click="toggleForm" class="fade" >{{text}}</p>
        <p v-show="isLogined" @click="logOut" class="fade" >LOGOUT</p>
      </router-link>
    </div>
    <div class="header-form" :class="showForm ? 'is-show' : ''">
      <Forms :hideForm="hideForm" />
    </div>
  </div>
</template>

<script>
import Forms from '@/components/Forms'

import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  props: {
    showForm: Boolean,
    text: String,
    toggleForm: Function,
    hideForm: Function,
    logOut: Function
  },
  components: {
    Forms
  },
  computed: {
    ...mapGetters(['isLogined'])
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 0;
  position: relative;
  z-index: 20;

  a {
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    color: #2c3e50;
    transition: 0.3s ease-out;
    text-decoration: none;
  }
}

.header-form {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 666px;
  top: 93px;
  left: 0;
  opacity: 0;
  transform: translateY(-120%);
  transition: all 0.6s ease-out;
}

.is-show {
  opacity: 1;
  transform: translateY(0);
}
</style>
