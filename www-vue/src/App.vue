<template>
  <div id="app">
    <app-menu></app-menu>
    <!--img src="./assets/logo.png"-->
    <div class="container">
      <router-view/>
    </div>
    <div class="offline-message" v-if="!online">
      ⚠️ You lost internet connection !
    </div>
    <vue-snotify></vue-snotify>
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
    // Listeners to offlin/online
    window.addEventListener('offline', e => {
      this.online = false
    })
    window.addEventListener('online', e => {
      this.online = true
    })
  },
  data () {
    return {
      online: navigator.onLine
    }
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
    --deactivated-color: darkgrey ;

    --sheet-bg-color: #ededed;
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
  @media screen and (max-width: 470px) {
    #app .container {
      padding-top: 6em;
    }
  }
  @media screen and (max-width: 240px) {
    #app .container {
      padding-top: 7em;
    }
  }
  @media screen and (max-width: 160px) {
    #app .container {
      padding-top: 8em;
    }
  }
  a, .link {
    color: var(--first-color);
    text-decoration: none;
    cursor: pointer;
  }
  a[href]:hover, .link:hover {
    color: var(--third-color);
    text-decoration: underline;
  }
  /** Form **/
  fieldset {
    border: 1px solid var(--first-color);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin: 1em 0;
    padding: 2em 1em;
    -moz-box-shadow:    inset 0px 0px 8px 2px var(--second-color);
    -webkit-box-shadow: inset 0px 0px 8px 2px var(--second-color);
    box-shadow:         inset 0px 0px 8px 2px var(--second-color);
  }
  fieldset > legend {
    font-weight: bold;
  }
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
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
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
    background-color: var(--sheet-bg-color);
    border: 1px solid var(--first-color);
    z-index: 200;
    box-shadow: 0px 0px 8px 2px var(--second-color);
  }
  .sheet::before,
  .sheet::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 3px;
    left: 0;
    background-color: var(--sheet-bg-color);
    z-index: -1;
    -webkit-transform: rotateZ(1deg);
    -moz-transform: rotateZ(1deg);
    -ms-transform: rotateZ(1deg);
    border: 1px solid var(--first-color);
    box-shadow: 0px 0px 8px 2px var(--second-color);
  }
  .sheet::after{
    top: 5px;
    z-index: -2;
    -webkit-transform: rotateZ(-2deg);
    -moz-transform: rotateZ(-2deg);
    -ms-transform: rotateZ(-2deg);
    background-color: var(--sheet-bg-color);
    box-shadow: 0px 0px 8px 2px var(--second-color);
  }
  .shadow {
    box-shadow: 0px 0px 8px 2px var(--second-color);
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
  }
  .dashed-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      var(--third-color),
      var(--third-color) 10px,
      var(--third-color) 10px,
      var(--second-color) 10px,
      var(--second-color) 20px
    );
  }
  #app .offline-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4em;
    line-height: 4em;
    padding-left: 2em;
    background-color: var(--error-color);
    font-weight: bold;
    color: white;
    box-shadow: 0px 0px 8px 2px var(--error-color);
    z-index: 100;
  }
  /** Tool bar **/
  .toolbar-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .toolbar-1 > :first-child {
    flex-grow: 1;
  }
  .toolbar-1 > *:not(:first-child) {
    margin: 0 0.5em;
  }
  /** Arrow **/
  .arrow {
    display: inline-block;
    border: 1px solid var(--first-color);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    line-height: 2em;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }
  .arrow:hover {
    text-decoration: none;
    background-color: var(--first-color);
  }
  .arrow.arrow-left::before {
    content: "<";
  }
  .arrow.arrow-bottom::before {
    display: inline-block;
    content: "<";
    transform: rotate(-90deg);
  }
</style>
