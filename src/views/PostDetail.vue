<template>
  <div class="post-detail">
    <Breadcrumbs :linkTitle="postDetail.title" />
    <div class="container post-detail-contents">
      <div class="post-detail-container">
        <p class="post-detail-date" v-show="postDetail.createdAt !== null">{{postDetail.createdAt | formatDate}}</p>
        <p v-show="isLogined" class="post-detail-edit"><router-link :to="`/posts/${postDetail.id}/update`">EDIT POST</router-link></p>
      </div>
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
      <div class="post-input-comment-container" v-show="isLogined">
        <form @submit.prevent="onSubmitComment">
          <textarea v-model="addCommentData.content" placeholder="Write comment" class="post-input-comment"></textarea>
          <input class="post-input-comment-submit" type="submit" value="Submit">
        </form>
      </div>
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
      noImage: require('@/assets/noimage.png'),
      addCommentData: {
        id: null,
        content: ''
      }
    }
  },
  mounted () {
    this.fetchSinglePost(this.id)
    this.addCommentData.id = this.id
  },
  methods: {
    ...mapActions(['fetchSinglePost', 'addComment']),
    onSubmitComment () {
      this.addComment(this.addCommentData).then((res) => {
        // this.$router.push({ path: `/posts/${this.id}` })
        console.log(this.fetchSinglePost(this.id))
        console.log(res)
      })
      this.addCommentData = {
        content: ''
      }
    }
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

  .post-detail-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-detail-contents {
    margin-top: 118px;
  }
  .post-detail-date {
    font-size: 20px;
  }

  .post-detail-edit {
    font-weight: bold;
    font-size: 20;
    color: black;

    a {
      text-decoration: none;
      color: black;
    }
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
    align-items: flex-start;
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
