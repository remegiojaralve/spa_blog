<template>
  <div>
    <h3>Add Post</h3>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="newPost.title" name="title" placeholder="blog title..."><br><br>
      <input type="text" v-model="newPost.img" name="title" placeholder="image url..."><br><br>
      <textarea v-model="newPost.content"  name="body" placeholder="Your blog description..." cols="30" rows="10"></textarea><br>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AddPost',
  data () {
    return {
      newPost: {
        title: '',
        img: '',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions(['addPost']),
    onSubmit () {
      this.addPost(this.newPost)
      this.newPost = {
        title: '',
        img: '',
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
