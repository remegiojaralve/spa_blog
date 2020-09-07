<template>
  <div class="post-detail">
    <Breadcrumbs :linkTitle="postDetail.title" />
    <div class="container post-detail-contents">
      <p class="post-detail-date" v-show="postDetail.createdAt !== null">{{postDetail.createdAt | formatDate}}</p>
      <p v-show="isLogined">EDIT POST</p>
      <h3 class="post-detail-title"> {{ postDetail.title }} </h3>
      <div class="post-detail-image">
        <img :src="postDetail.image === null ? noImage : postDetail.image" :alt="postDetail.title" />
      </div>
      <p class="post-detail-description"> {{postDetail.content}} </p>
      <hr>
      <h3 class="post-detail-comments-heading">COMMENT</h3>
      <div class="post-detail-comments" v-for="comment in postDetail.comments" :key="comment.id">
        <p class="post-detail-comments-description"> {{comment.content}} </p>
        <p class="post-detail-comments-date"> {{comment.createdAt | formatDate}} </p>
      </div>
      <div v-show="isLogined">Add Comment</div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Breadcrumbs from '../components/Breadcrumbs.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PostDetail',
  components: {
    Breadcrumbs
  },
  props: {
    showForm: Boolean,
    text: String,
    toggleForm: Function,
    hideForm: Function
  },
  data () {
    return {
      id: this.$route.params.id,
      post: '',
      noImage: require('@/assets/noimage.png')
    }
  },
  mounted () {
    this.fetchSinglePost(this.id)
  },
  methods: {
    ...mapActions(['fetchSinglePost'])
  },
  computed: {
    ...mapGetters(['postDetail', 'isLogined'])
  }
}
</script>

<style lang="scss" scoped>
  .post-detail {
    color: black;
    text-align: left;
  }

  .post-detail-contents {
    margin-top: 118px;
  }
  .post-detail-date {
    font-size: 20px;
  }

  .post-detail-title {
    font-size: 40px;
    font-weight: bold;
    margin-top: 32px;
  }

  .post-detail-image {
    width: 100%;
    height: 540px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 39px;

    img {
      width: 100%;
    }
  }

  .post-detail-description {
    font-size: 18px;
    letter-spacing: 0.1em;
    line-height: 1.5;
    margin-top: 60px;
    padding-bottom: 130px;
  }

  .post-detail-comments-heading {
    font-size: 50px;
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-top: 53px;
  }

  .post-detail-comments {
    background-color: #F5F5F5;
    padding: 54px 40px 49px;
    margin-top: 32px;
  }

  .post-detail-comments-description {
    font-size: 18px;
    line-height: 2;
    letter-spacing: 0.1em;
  }

  .post-detail-comments-date {
    font-size: 16px;
    letter-spacing: 0.1em;
  }
</style>
