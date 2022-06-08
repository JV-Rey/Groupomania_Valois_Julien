<template>
  <h3>Remplicez ces informations pour vous inscrire à Groupomania</h3>
  <form @submit.prevent="SignUpView" alt="formulaire d'inscription à Groupomania">
    <div>
      <label for="firstName">Votre prénom :
        <input type="text" id="firstName" v-model="firstName" placeholder="Mon prénom - ex : Jean" alt="renseigner votre prénom">
      </label>

      <label for="lastName">Votre nom :
        <input type="text" id="lastName" v-model="lastName"  placeholder="Mon nom - ex : Dupont" alt="renseigner votre nom">
      </label>

      <label for="email">Votre adresse mail :
        <input type="text" id="email" v-model="email" placeholder="Mon email - ex : dupont@groupomania.fr" alt="renseigner votre email">
      </label>

      <label for="password">Votre mot de passe : 
        <input type="password" id="password" v-model="password" placeholder="Mon mot de passe* - ex : dupontpass!" alt="choisir votre mot de passe">
      </label>

      <button type="submit">Créer un compte</button>
    </div>
  </form>
  <p>Vous avez déja un compte? <a href="/login">Connectez</a>-vous!</p>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'SignUpView',
    data(){
      return{
        FormData: {
          firstName:"",
          lastName:"",
          email:"",
          password:""
        }

      }
    },
    
    methods: {
      signUp(){
        axios.post('http://localhost:3000/api/user', this.formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
      }
    },
  }
</script>
