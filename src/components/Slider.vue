<template>
  <div id="slider" class="slideshow-container">
    <div v-show="slideIndex === index" class="mySlides fade" v-for="(slides, index) in allLatestPosts" :key="index">
      <img alt="Slide" :src="slides.image === null ? noImage : slides.image" :class="slides.image === null ? 'no-image' : ''">
      <router-link class="post-link" :to="`/posts/${slides.id}`">
        <div class="slide-content">
          <h3>{{slides.title}}</h3>
          <p>{{slides.createdAt | formatDate}}</p>
        </div>
      </router-link>
    </div>
    <a class="slide-nav prev" @click="prevSlide"><span></span></a>
    <a class="slide-nav next" @click="nextSlide"><span></span></a>

    <div class="dots">
      <span v-for="(dot, index) in allLatestPosts" :key="index" class="dot" :class="slideIndex === index ? isActive : ''" @click="currentSlide(index)"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Slider',
  data () {
    return {
      slideIndex: 0,
      isActive: 'active',
      noImage: require('@/assets/noimage.png')
    }
  },
  created () {
    this.fetchLatestPosts()
  },
  methods: {
    ...mapActions(['fetchLatestPosts']),
    prevSlide () {
      if (this.slideIndex <= 0) {
        this.slideIndex = this.allLatestPosts.length - 1
      } else {
        this.slideIndex--
      }
    },
    nextSlide () {
      if (this.slideIndex >= this.allLatestPosts.length - 1) {
        this.slideIndex = 0
      } else {
        this.slideIndex++
      }
    },
    currentSlide (index) {
      this.slideIndex = index
    }
  },
  computed: {
    ...mapGetters(['allLatestPosts'])
  }
}
</script>

<style lang="scss" scoped>
.slideshow-container {
  width: 100%;
  height: 666px;
  position: relative;
  overflow: hidden;
}

img {
  width: 100%;
}

.no-image {
  width: auto;
}

.slide-content {
  width: 584px;
  position: absolute;
  top: 50%;
  right: 125px;
  transform: translateY(-50%);
  text-align: right;

  h3 {
    display: inline;
    font-size: 60px;
    color: white;
    position: relative;
    word-break: break-all;
    background-color: black;
    line-height: 1.5;
    box-shadow: -5px 0 black;
  }

  p {
    font-size: 28px;
    color: black;
    margin-top: 20px;
  }
}

.slide-nav {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 7.5px;
  color: transparent;
  transition: 0.6s ease;
  user-select: none;
  width: 10.94px;
  height: 21.8px;
  border: 5px solid black;
  transform: rotate(45deg);

  &:hover {
    transform: scale(1.1) rotate(45deg);
  }
}

.prev {
  left: 51px;
  border-width: 0 0 5px 5px;
}

.next {
  right: 51px;
  border-width: 5px 5px 0 0;
}

.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

.dots {
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;

  &.active, &:hover {
    background-color: black;
  }
}
</style>
