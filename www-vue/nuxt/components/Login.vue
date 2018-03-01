<template>
  <div class="login-container sheet">
    <div id="output" class="fadeInUp"> Hello wolrd</div>
    <div class="avatar"></div>
    <div class="form-box">
      <form >
        <input
          type="text"
          name="user"
          placeholder="Username"
          v-model="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <button
          class="btn btn-info btn-block login"
          type="button"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
<script>
  import Http from '../plugins/Http'

  export default {
    name : 'login',
    data() {
      return {
        username : '',
        password : ''
      }
    },
    created() {
      Http.get();
    },
    methods: {

    }
  }
</script>
<style scoped>
  .login-container{
    position: relative;
    width: 300px;
    margin: 80px auto;
    padding: 20px 40px 40px;
    text-align: center;
    background: #fff;
    border: 1px solid #ccc;
  }
  .avatar{
    width: 100px;
    height: 100px;
    margin: 10px auto 30px;
    border-radius: 100%;
    border: 2px solid #aaa;
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWAgMAAABV+geQAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEX////8PTIAfjpoIrHoAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EICgIJNL3zUrAAAABCSURBVGje7csxEQAgDASwB2WYwA96UIkAlq69S/Ykn7ErVkzTNE3TNE3TNE3TNHvOeSuOaZqmaZqmaZqmaZpmh/kA2nAF8HcsfiIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDgtMTBUMDI6MDk6NTIrMDA6MDDSkTaFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA4LTEwVDAyOjA5OjUyKzAwOjAwo8yOOQAAAABJRU5ErkJggg==);
  }
  .form-box input{
    width: 100%;
    padding: 1em;
    border: 1px solid #ccc;;
    background: #fafafa;
    transition:0.2s ease-in-out;
  }
  .form-box input:focus{
    outline: 0;
    background: #eee;
  }
  .form-box input[type="text"]{
    border-radius: 0.5em 0.5em 0 0;
  }
  .form-box input[type="password"]{
    border-radius: 0 0 0.5em 0.5em;
    border-top: 0;
  }
  .form-box button.login{
    margin-top: 1em;
    padding: 1em 1.5em;
  }
</style>
