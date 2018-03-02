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
  :root {
    --first-color: #818181;
    --second-color: lightgray;
    --third-color: #c1c1c1;

    --maintext-color: black;

    --ok-color: darkgreen;
    --error-color: darkred;
    --warning-color: darkorange;
  }
  html, body {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin : 0;
    padding: 0;
    color: var(--maintext-color);
  }
  input {
    color: var(--maintext-color);
  }
  ::placeholder {
    color: var(--maintext-color);
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: var(--maintext-color);
  }
  ::-ms-input-placeholder {
    color: var(--maintext-color);
  }
  #app .container {
    padding: 4em 1em;
  }
  a {
    color: var(--first-color);
    text-decoration: none;
  }
  a[href]:hover {
    color: var(--third-color);
    text-decoration: underline;
  }
  /** Form **/
  input{
    padding: 0.5em;
    height: 2em;
    border: 1px solid var(--first-color);
    background: #fafafa;
    transition: 0.2s ease-in-out;
  }
  input:focus{
    outline: 0;
    background: var(--second-color);
  }
  input[type]{
    border-radius: 5px;
  }
  button {
    margin-top: 0.5em;
    padding: 0.5em 0.1em;
    cursor: pointer;
  }
  button {
    background: var(--third-color);
    background-image: -webkit-linear-gradient(top, var(--second-color), var(--first-color));
    background-image: -moz-linear-gradient(top, var(--second-color), var(--first-color));
    background-image: -ms-linear-gradient(top, var(--second-color), var(--first-color));
    background-image: -o-linear-gradient(top, var(--second-color), var(--first-color));
    background-image: linear-gradient(to bottom, var(--second-color), var(--first-color));
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: var(--maintext-color);
    text-decoration: none;
  }
  button:hover {
    background: var(--third-color);
    background-image: -webkit-linear-gradient(top, var(--first-color), var(--second-color));
    background-image: -moz-linear-gradient(top, var(--first-color), var(--second-color));
    background-image: -ms-linear-gradient(top, var(--first-color), var(--second-color));
    background-image: -o-linear-gradient(top, var(--first-color), var(--second-color));
    background-image: linear-gradient(to bottom, var(--first-color), var(--second-color));
    text-decoration: none;
  }
  /** Sheet style **/
  .sheet {
    position: relative;
    margin: 1em;
    padding: 1em;
  }
  .sheet::before,
  .sheet::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 3px;
    left: 0;
    background: #fff;
    z-index: -1;
    -webkit-transform: rotateZ(4deg);
    -moz-transform: rotateZ(4deg);
    -ms-transform: rotateZ(4deg);
    border: 1px solid var(--first-color);
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
    color: var(--error-color);
    padding: 0.5em 1em;
  }
</style>
