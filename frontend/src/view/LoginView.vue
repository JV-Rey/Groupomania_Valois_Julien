<template>
  <img src="../assets/icon-left-font.svg" alt="Logo Groupomania">
  <h3>Connection:</h3>
  <form @submit.prevent="login" alt="formulaire de connection à Groupomania">
    <div class="form-group">
      <label for="email">Votre adresse mail :</label>
      <input type="text" id="email" required v-model="credentials.email" placeholder="ex : dupont@groupomania.fr" alt="renseigner votre email">
    </div>
    
    <div class="form-group">
      <label for="password">Votre mot de passe :</label>
      <input type="password" id="password" required v-model="credentials.password" placeholder="ex : dupontpass!" alt="choisir votre mot de passe">
    </div>
    <button>Connection</button>
  </form>
  <p>Si vous n'avez pas de compte, vous pouvez en <a href="/signup">créer</a> un!</p>
</template>

<script>
  export default {
    name: 'loginView',
    data(){
      return{
        credentials: {
          email:"",
          password:"",
        }
      }
    },
    methods: {
      login(){
        const options = {
          method: "POST",
          body: JSON.stringify(this.credentials),
          headers: {
            'Content-type' : 'application/json'
          }
        }
        fetch('http://localhost:3000/api/auth/login', options)
        .then(res => res.json())
        .then(data => {
          if (data.token){
            sessionStorage.setItem('token', data.token);
            this.$router.push("/");
          }
          if (data.userId && (typeof data.isAdmin != "undefined")){
            sessionStorage.setItem('userInfo', JSON.stringify({
              userId: data.userId,
              isAdmin: data.isAdmin
            }))
          }
          return data.token;
        })      
      }      
    }
  }
</script>

<style>
  img{
    width: 200px;
  }

    h3{
    color: #FD2D01;
  }

  .form-group {
      display: flex;
      justify-content: center;
      padding: 1.5rem;
  }

  label{
    margin: 0px 20px;
  }

  button{
    margin: 20px;
  }
</style>