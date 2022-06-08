<template>
  <h3>Connection:</h3>
  <form @submit.prevent="onSubmit" alt="formulaire de connection à Groupomania">
    <div>
      <label for="email">Votre adresse mail :
        <input type="text" id="email" required v-model="email" placeholder="Mon email - ex : dupont@groupomania.fr" alt="renseigner votre email">
      </label>

      <label for="password">Votre mot de passe : 
        <input type="password" id="password" required v-model="password" placeholder="Mon mot de passe* - ex : dupontpass!" alt="choisir votre mot de passe">
      </label>

      <button type="submit">Connection</button>
    </div>
  </form>
  <p>Si vous n'avez pas de compte, vous pouvez en <a href="/signup">créer</a> un!</p>
</template>

<script>
  export default {
    name: 'loginView',
    data(){
      return{
        email:"",
        password:"",
        id:""
      }
    },
    created() {
      fetch('http://localhost:3000/api/auth')
        .then(res => res.json())
        
    },
    
    
  }
</script>