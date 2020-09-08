<template>
    <div class="post-list">
      <div class="post-list-text">
        <h3>NEWS</h3>
        <router-link class="post-list-create" v-show="isLogined" to="/create-new-post">Create New Post</router-link>
      </div>
      <input class="post-list-search" type="text" v-model="search" placeholder="search posts...">
      <ul>
        <li class="fade" v-for="( post ) in searchPosts" :key="post.id">
          <router-link class="post-link" :to="`/posts/${post.id}`">
            <div class="post-image">
              <img :src="post.image === null ? noImage : post.image" :alt="post.title" />
            </div>
            <div class="post-content">
              <p class="post-date"> {{post.createdAt | formatDate}} </p>
              <h3 class="post-title"> {{post.title}} </h3>
            </div>
          </router-link>
        </li>
      </ul>
      <button v-show="postTotal < getTotalPost" @click="loadMore" class="post-list-loadmore">LOAD MORE</button>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BlogList',
  data () {
    return {
      search: '',
      noImage: require('@/assets/noimage.png'),
      postTotal: 6
    }
  },
  created () {
    this.fetchPosts(this.postTotal)
    this.fetchTotalPost()
  },
  methods: {
    ...mapActions(['fetchPosts', 'fetchTotalPost']),
    loadMore () {
      this.postTotal += 6
      this.fetchPosts(this.postTotal)
    }
  },
  computed: {
    ...mapGetters(['allPosts', 'isLogined', 'getTotalPost']),
    searchPosts () {
      return this.allPosts.filter((post) => {
        return post.title.match(this.search)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    font-size: 50px;
    text-align: left;
    color: black;
  }

  .post-list {
    width: 100%;
    margin-top: 96px;
  }

  .post-list-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-list-search {
    width: 100%;
    height: 40px;
    font-size: 16px;
    padding: 10px;
    letter-spacing: 0.1em;
    margin-top: 90px;
  }

  .post-list-create {
    font-size: 20px;
    font-weight: bold;
    color: black;
  }

  .post-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      height: 100%;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  li {
    list-style: none;
    width: 340px;
    border: 1px solid black;
    margin-top: 61px;
    padding: 39px 28px;

    &:hover {
      img {
        opacity: 0.5;
      }

      h3 {
        color: blue;
      }
    }
  }

  img {
    width: 100%;
    transition: opacity 0.3s ease-out;
  }

  .post-title {
    transition: color 0.3s ease-out;
    font-size: 20px;
    margin-top: 16px;
    color: black;
  }

  .post-content {
    text-align: left;
    margin-top: 28px;
  }

  .post-list-loadmore {
    width: 340px;
    height: 70px;
    background-color: black;
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-top: 70px;
    border: 0;
    cursor: pointer;
  }
</style>
