<template>
    <Header></Header>
    <h2>Profile de {{user.firstName + user.lastName}}</h2>  
    <img src="{{user.imageUrl}}" alt="Votre image de profile">  
    <form @submit.prevent="modifProfile" class="flex" alt="formulaire de modifacation de profile">
        <label for="email">Votre email est {{user.email}}, voulez-vous la changer?</label>
        <input type="text" name="email" id="email" v-model="user.email" placeholder="ex : dupont@groupomania.fr" alt="renseigner votre nouvel email">
        
        <label for="password">Voulez-vous changer votre mot de passe?</label>
        <input type="password" name="password" id="password" v-model="user.password" placeholder="ex : dupontpass!" alt="renseigner votre nouveau mot de passe">
        
        <label for="image">Voulez vous changer votre image de profile? :</label>
        <input type="file" name="image" id="image" accept="image/*" alt="changer votre image de profile">
    <button>Modifier les informations de votre profile.</button>
    </form>

</template>

<script>
    import Header from "../components/Header.vue";

    export default {
        name: 'homeView',
        components: {
        Header,
        },
        data() {
            return {
                user: {
                    firstName:'',
                    lastName:'',
                    email:'',
                    password:'',
                    imageUrl:''
                }                
            }
        },
        methods: {
        getOneUser(){
            let token = sessionStorage.getItem('token');
            const options = {
                method: "GET",
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                }
            }
        fetch('http://localhost:3000/api/user', options)
        .then(res => res.json())
        .then(data => this.user = data)
        .catch(error => console.log(error))
        console.log(this.user);
      },
        modifProfile(){
            let token = sessionStorage.getItem('token');
            let input = document.getElementById('image')
            let formData = new FormData();
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('image', input.files[0])
            const options = {
                method: "PUT",
                body: formData,
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    'Authorization' : 'Bearer ' + token
                }
            }
            fetch("http://localhost:3000/api/user", options)
            .then(res => res.json())
            .then(data => this.post = data)
            .catch(error => console.log(error))
            }     
        },
    }
</script>

<style>
  .flex{
    display: flex;
    flex-direction: column;
  }
</style>