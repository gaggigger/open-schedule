<template>
  <div id="app">
    <app-menu></app-menu>
    <!--img src="./assets/logo.png"-->
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppMenu from './components/AppMenu.vue'
// import Firebase from 'firebase'

export default {
  name: 'App',
  components: {
    AppMenu
  },
  created () {
    /*
    const app = Firebase.initializeApp({
      apiKey: 'AIzaSyC8hI-mObh6_zC4CHCsErTcfSu3msojp4o',
      authDomain: 'formation-tz.firebaseapp.com',
      databaseURL: 'https://formation-tz.firebaseio.com',
      projectId: 'formation-tz',
      storageBucket: 'gs://formation-tz.appspot.com',
      messagingSenderId: '604798803445'
    })
    app.database().ref('members').on('value', snapshot => {
      console.log(snapshot.val())
    })
    */
  }
}
</script>

<style>
  html, body {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin : 0;
    padding: 0;
  }
  #app .container {
    padding: 4em 1em;
  }
  /** Sheet style **/
  .sheet::before,
  .sheet::after{
    content: "";
    position: absolute;
    width: 100%;height: 100%;
    top: 3.5px;left: 0;
    background: #fff;
    z-index: -1;
    -webkit-transform: rotateZ(4deg);
    -moz-transform: rotateZ(4deg);
    -ms-transform: rotateZ(4deg);
    border: 1px solid #ccc;
  }
  .sheet::after{
    top: 5px;
    z-index: -2;
    -webkit-transform: rotateZ(-2deg);
    -moz-transform: rotateZ(-2deg);
    -ms-transform: rotateZ(-2deg);
  }
  /** Animation **/
  @-webkit-keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(20px);
      -ms-transform: translateY(20px);
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }
  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
    animation-duration: 4s;
  }
  .error {
    color: red;
    padding: 0.5em 1em;
  }
</style>
