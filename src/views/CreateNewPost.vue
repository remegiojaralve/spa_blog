<template>
  <div class="create-post">
    <Breadcrumbs linkTitle="Create New Post" />
    <div class="container">
      <form enctype="multipart/form-data" id="createPost">
        <div class="create-post-buttons">
          <span @click="onSubmit">Save Post</span>
          <router-link to="/">Cancel</router-link>
        </div>
        <p class="create-post-date"> {{newPost.date | formatDate}} </p>
        <div class="create-post-title">
          <textarea v-model="newPost.title" placeholder="Title" :class="!$v.newPost.title.required && $v.newPost.title.$dirty ? 'error' : ''"></textarea>
        </div>
        <div class="create-post-image">
          <img v-if="newPost.image" :src="newPost.image" />
          <input type="file" @change="onFileSelect" ref="fileImage">
          <button @click.prevent="$refs.fileImage.click()">UPLOAD IMAGE</button>
        </div>
        <textarea class="create-post-content" :class="!$v.newPost.content.required && $v.newPost.content.$dirty ? 'error' : ''" v-model="newPost.content" placeholder="Content"></textarea>
      </form>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CreateNewPost',
  components: {
    Breadcrumbs
  },
  data () {
    return {
      url: null,
      newPost: {
        formId: document.querySelector('#createPost'),
        date: new Date(),
        title: '',
        image: '',
        content: ''
      }
    }
  },
  validations: {
    newPost: {
      title: {
        required
      },
      content: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['addPost']),
    onSubmit () {
      this.$v.newPost.$touch()
      if (!this.$v.newPost.$invalid) {
        this.addPost(this.newPost)
          .then(res => {
            this.$router.push({ path: `/posts/${res.addPost.id}` })
          })
        this.newPost = {
          title: '',
          image: '',
          content: ''
        }
      }
    },
    onFileSelect (e) {
      console.log(e)
      const file = e.target.files[0]
      const reader = new FileReader()
      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onloadend = () => {
        this.newPost.image = reader.result
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-post-buttons {
    text-align: right;
    margin-top: 62px;
    font-size: 20px;
    letter-spacing: 0.15em;
    color: black;
    font-weight: bold;
    text-decoration: underline;

    span {
      cursor: pointer;
    }

    a {
      margin-left: 52px;
      text-decoration: none;
      color: black;
    }
  }

  .create-post-date {
    font-size: 20px;
    color: black;
    letter-spacing: 0.1em;
    text-align: left;
    margin-top: 30px;
  }

  .create-post-title {
    margin-top: 16px;

    textarea {
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
      height: 147px;
      font-size: 40px;
      color: black;
      letter-spacing: 0.1em;
      padding: 20px 17px;
      font-weight: bold;
      outline: none;

      &.error {
        border-color: red;
      }
    }
  }

  .create-post-image {
    width: 100%;
    height: 540px;
    background-color: #D6D6D6;
    position: relative;
    margin-top: 25px;
    z-index: 1;
    overflow: hidden;

    input {
      display: none;
    }

    img {
      width: 100%;
    }

    button {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.1em;
      color: white;
      background-color: black;
      padding: 20px;
      position: absolute;
      width: 260px;
      bottom: 0;
      left: 0;
      z-index: 2;
      cursor: pointer;
      outline: none;
    }
  }

  .create-post-content {
    width: 100%;
    height: 394px;
    color: black;
    font-size: 18px;
    padding: 20px;
    letter-spacing: 0.1em;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 35px;
    outline: none;

    &.error {
      border-color: red;
    }
  }
</style>
