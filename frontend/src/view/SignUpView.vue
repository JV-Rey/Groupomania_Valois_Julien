<template>
  <img src="../assets/icon-left-font.svg" alt="Logo Groupomania">
  <h3>Remplicez ces informations pour vous inscrire à Groupomania.</h3>
  <form @submit.prevent="signUp" alt="formulaire d'inscription à Groupomania">
      <div class="form-group">
        <label for="firstName">Votre prénom :</label>      
        <input type="text" class="form-control" id="firstName" v-model="user.firstName" placeholder="ex : Jean" alt="renseigner votre prénom">
      </div>

      <div class="form-group">
        <label for="lastName">Votre nom :</label>
        <input type="text" id="lastName" v-model="user.lastName"  placeholder="ex : Dupont" alt="renseigner votre nom">
      </div>

      <div class="form-group">
        <label for="email">Votre adresse mail :</label>
        <input type="text" id="email" v-model="user.email" placeholder="ex : dupont@groupomania.fr" alt="renseigner votre email">
      </div>

     <div class="form-group">
        <label for="password">Votre mot de passe :</label>
        <input type="password" id="password" v-model="user.password" placeholder="ex : dupontpass!" alt="choisir votre mot de passe">
      </div>
    <button>Créer un compte</button>
  </form>
  <p>Vous avez déja un compte? <a href="/login">Connectez</a>-vous!</p>
</template>

<script>
  export default {
    name: 'SignUpView',
    data(){
      return{
        user: {
          firstName:"",
          lastName:"",
          email:"",
          password:""
        }
      }
    },    
    methods: {
      signUp(){
        const options = {
          method: "POST",
          body: JSON.stringify(this.user),
          headers: {
            'Content-type' : 'application/json'
          }
        }
        fetch("http://localhost:3000/api/auth/signup", options)
        .then(res => res.json())
        .catch(error => console.log(error))
      }
    },
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