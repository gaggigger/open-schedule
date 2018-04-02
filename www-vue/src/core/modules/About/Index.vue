<template>
  <section>
    <h2>Powered by</h2>
    <div class="partner">
      <a href="https://vuejs.org/" target="__blank">
        <img src="https://vuejs.org/images/logo.png" />
      </a>
    </div>
    <div class="partner">
      <a href="https://nodejs.org/" target="__blank">
        <img src="https://nodejs.org/static/images/logo.svg" style="background-color: #333;" />
      </a>
    </div>
    <div class="partner">
      <a href="http://expressjs.com/" target="__blank">
        Express
      </a>
    </div>
    <div class="partner">
      <a href="https://www.npmjs.com/" target="__blank">
        <svg viewBox="0 0 18 7">
          <path fill="#CB3837" d="M0,0v6h5v1h4v-1h9v-6"></path>
          <path fill="#FFF" d="M1,1v4h2v-3h1v3h1v-4h1v5h2v-4h1v2h-1v1h2v-4h1v4h2v-3h1v3h1v-3h1v3h1v-4"></path>
        </svg>
      </a>
    </div>
    <div class="partner">
      <a href="https://fullcalendar.io/" target="__blank">
        <img src="https://fullcalendar.io/assets/images/logo.svg">
      </a>
    </div>
    <div class="partner">
      <a href="https://www.mysql.com/" target="__blank">
        <img src="https://labs.mysql.com/common/logos/mysql-logo.svg?v2" />
      </a>
    </div>
    <div class="partner">
      <a href="https://git-scm.com/" target="__blank">
        <img src="https://git-scm.com/images/logo@2x.png" />
      </a>
    </div>
    <div class="partner moment">
      <a href="https://momentjs.com/" target="__blank">
        <svg width="40px" height="40px" viewBox="0 0 40 40">
          <ellipse stroke-width="3" cx="20" cy="20" rx="18.5" ry="18.5" fill="0" stroke="#000"></ellipse>
          <path fill-rule="evenodd" d="M20,36 C28.836556,36 36,28.836556 36,20 C36,11.163444 28.836556,4 20,4 C11.163444,4 4,11.163444 4,20 C4,28.836556 11.163444,36 20,36 Z M20,5 C19.4477153,5 19,5.44994876 19,6.00684547 L19,19 L11.9970301,19 C11.4463856,19 11,19.4438648 11,20 C11,20.5522847 11.4556644,21 11.9953976,21 L21,21 L21,6.00087166 C21,5.4481055 20.5561352,5 20,5 Z"></path>
        </svg>
      </a>
    </div>
    <div class="partner text">
      <a href="https://github.com/alfhen/vue-cookie" target="__blank">
        vue-cookie
      </a>
    </div>
    <div class="partner text">
      <a href="https://github.com/artemsky/vue-snotify" target="__blank">
        vue-snotify
      </a>
    </div>
    <div class="partner text">
      <a href="http://vuejs.creative-tim.com/vue-tabs/#/" target="__blank">
        vue-nav-tabs
      </a>
    </div>
    <div class="partner text">
      <a href="https://www.npmjs.com/package/uuid" target="__blank">
        uuid
      </a>
    </div>
    <div class="partner">
      <a href="https://firebase.google.com/" target="__blank">
        <img src="https://firebase.google.com/_static/7a342985d6/images/firebase/lockup.png" />
      </a>
    </div>
    <div class="partner text">
      <a href="https://calibre-ebook.com/" target="__blank">
        Calibre - ebook managment
      </a>
    </div>
  </section>
</template>
<style scoped>
  article {
    text-align: center;
  }
  div.partner {
    margin: 10px;
  }
  div.partner img,
  div.partner svg
  {
    max-height: 50px;
    max-width: 100px;
  }
  div.partner.text a {
    font-weight: bold;
    font-size: 1.2em;
  }
  .moment ellipse {
    stroke: #fff;
  }
  .moment path {
    fill: #b0d9d3;
  }
</style>
