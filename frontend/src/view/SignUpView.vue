<template>
  <img src="../assets/icon-left-font.svg" alt="Logo Groupomania">
  <div class="border">
    <h3>Compléter ces informations pour vous inscrire à Groupomania.</h3>
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
          <input type="text" id="email" v-model="user.email" pattern="[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+" placeholder="ex : dupont@groupomania.fr" alt="renseigner votre email">
        </div>

      <div class="form-group">
          <label for="password">Votre mot de passe :</label>
          <input type="password" id="password" v-model="user.password" placeholder="ex : dupontpass!" alt="choisir votre mot de passe">
        </div>
      <button>Créer un compte</button>
    </form>
    <p>Vous avez déja un compte? <a href="/login">Connectez</a>-vous!</p>
  </div>
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
        this.$router.push("/login")
        .catch(error => console.log(error))        
      },
    }
  }
</script>

<style scoped>
  img{
    width: 200px;
  }

  h3{
    color: #831701;
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

  .border{
    background-color: #FFD7D7;
    border: 5px solid #FD2D01;
    border-radius: 20px;
    box-shadow: 20px 5px 20px #4E5166;
    margin-top: 20px;
  }

  a{
    color: #831701;
    font-weight: bold;
  }

  @media only screen and (max-width: 540px) {
    .form-group {
      flex-direction: column;
      padding: 1.5rem;
    }

    p{
      margin: 10px;
    }
  }
</style>