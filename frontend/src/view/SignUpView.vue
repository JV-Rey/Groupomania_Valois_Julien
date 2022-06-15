<template>
  <img src="../assets/icon-left-font.svg" alt="Logo Groupomania">
  <h3>Remplicez ces informations pour vous inscrire à Groupomania.</h3>
  <form @submit.prevent="signUp" alt="formulaire d'inscription à Groupomania">
    <div>
      <label for="firstName">Votre prénom :
        <input type="text" id="firstName" v-model="firstName" placeholder="ex : Jean" alt="renseigner votre prénom">
      </label>

      <label for="lastName">Votre nom :
        <input type="text" id="lastName" v-model="lastName"  placeholder="ex : Dupont" alt="renseigner votre nom">
      </label>

      <label for="email">Votre adresse mail :
        <input type="text" id="email" v-model="email" placeholder="ex : dupont@groupomania.fr" alt="renseigner votre email">
      </label>

      <label for="password">Votre mot de passe : 
        <input type="password" id="password" v-model="password" placeholder="ex : dupontpass!" alt="choisir votre mot de passe">
      </label>

      <button>Créer un compte</button>
    </div>
  </form>
  <p>Vous avez déja un compte? <a href="/login">Connectez</a>-vous!</p>
</template>

<script>
  export default {
    name: 'SignUpView',
    data(){
      return{
        formData: {
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
          body: JSON.stringify(this.formData
          /*this.firstName, 
          this.lastName, 
          this.email, 
          this.password*/),
          headers: {
            'Content-type' : 'application/json'
          }
        }
        fetch("http://localhost:3000/api/auth/signup", options)
        .then(res => res.json())
        .catch(error => console.log(error))
        console.log(options);
      }
    },
  }
</script>

<style>
  img{
    width: 200px;
    height: 200px;
}</style>