<template>
  <div class="footer">
    <div class="footer-contents">
      <div class="container">
        <router-link to="/">
          <img alt="Vue logo" src="@/assets/logo-white.png">
        </router-link>
        <p>サンプルテキストサンプル ルテキストサンプルテキスト<br>サンプルテキストサンプル ルテキスト</p>
      </div>
    </div>
    <div class="footer-copyright">
      <p>Copyright©2007-2019 Blog Inc.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 165px;

  p {
    font-size: 16px;
    color: white;
  }
}

.footer-contents {
  background-color: #292929;
  text-align: left;
  padding: 87px 0 69px;

  img {
    width: 154px;
  }

  p {
    line-height: 2.2;
    margin-top: 43px;
  }
}

.footer-copyright {
  background-color: black;
  text-align: center;
  padding: 38px 0;

  p {
    letter-spacing: 0.1em;
  }
}
</style>
