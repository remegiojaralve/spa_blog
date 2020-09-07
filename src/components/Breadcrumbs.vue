<template>
  <div class="breadcrumbs">
    <div class="container breadcrumbs-contents">
      <router-link to="/">HOME</router-link> >
      <span>{{linkTitle}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Breadcrumbs',
  props: {
    link: String,
    linkTitle: String
  }
}
</script>

<style lang="scss" scoped>

  .breadcrumbs {
    background-color: #F5F5F5;
    text-align: left;
    padding: 33px 0;
  }

  .breadcrumbs-contents {
    font-size: 16px;
    color: black;
    letter-spacing: 0.1em;
    line-height: 1;

    a {
      color: black;
      text-decoration: none;
    }
  }
</style>
