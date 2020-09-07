<template>
  <div class="home">
    <Slider/>
    <div class="container">
      <PostList/>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider'
import PostList from '@/components/PostList'
export default {
  name: 'Home',
  components: {
    Slider,
    PostList
  }
}
</script>
