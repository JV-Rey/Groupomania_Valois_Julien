<template>
    <Header></Header>
    <div class="user">
        <h2>Profil de {{actualUser.firstName + ' ' + actualUser.lastName}}</h2>  
        <img :src="actualUser.imageUrl" alt="Votre image de profile">
        <p>Votre adresse mail est {{actualUser.email}}</p>
        <form @submit.prevent="modifProfile()" class="flex" alt="formulaire de modification de profile">
            <label for="firstName">Voulez-vous changer votre prénom?</label>      
            <input type="text" name="firstName" id="firstName" v-model="actualUser.firstName" placeholder="ex : Jean" alt="renseigner votre prénom">

            <label for="lastName">Voulez-vous changer votre nom?</label>
            <input type="text" name="lastName" id="lastName" v-model="actualUser.lastName"  placeholder="ex : Dupont" alt="renseigner votre nom">
            
            <label for="image">Voulez vous changer votre image de profil? :</label>
            <input type="file" ref="inputImg" name="image" id="image" accept="image/*" alt="changer votre image de profil">
        <button>Modifier les informations de votre profil.</button>
        <button @click="deleteUser()">Supprimer votre compte.</button>   
        </form>
    </div>
    <div v-if="userInfo.isAdmin" class="user">
        <Users v-for="user in users" :key="user.id" :user="user"></Users>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import Users from "../components/Users.vue";
    export default {
        name: 'profileView',
        components: {
            Header,
            Users
        },
        data() {
            return {
                actualUser: {
                    firstName:'',
                    lastName:'',
                    email:'',
                    imageUrl:''
                }, 
                userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                users: []        
            }
        },
        created() {
            this.getAllUsers()
            this.getOneUser()
        },
        methods: {
            getOneUser(){
                let token = sessionStorage.getItem('token');
                let id = this.$route.params.id;
                const options = {
                    method: "GET",
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    }
                }
            fetch('http://localhost:3000/api/auth/user/' + id, options)
            .then(res => res.json())
            .then(data => this.actualUser = data)
            .catch(error => console.log(error))
            console.log(this.actualUser);
            },
            getAllUsers(){
                let token = sessionStorage.getItem('token');
                const options = {
                    method: "GET",
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    }
                }
            fetch('http://localhost:3000/api/auth/user', options)
            .then(res => res.json())
            .then(data => this.users = data)
            .catch(error => console.log(error))
            console.log(this.users);
            },
            modifProfile(){
                let token = sessionStorage.getItem('token');
                let id = this.$route.params.id                
                let input = this.$refs.inputImg;
                let formData = new FormData();
                formData.append('firstName', this.actualUser.firstName)
                formData.append('lastName', this.actualUser.lastName)
                formData.append('image', input.files[0])
                const options = {
                    method: "PUT",
                    body: formData,
                    headers: {
                        //'Content-Type': 'multipart/form-data',
                        'Authorization' : 'Bearer ' + token
                    }
                }
                fetch('http://localhost:3000/api/auth/user/' + id, options)
                .then(() => this.$router.go())
                .catch(error => console.log(error))
                }, 
            deleteUser(){
                let token = sessionStorage.getItem('token');
                let id = this.$route.params.id  
                const options = {
                    method: "delete",
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    }
                }
            fetch('http://localhost:3000/api/auth/user/' + id, options)
            .then(res => res.json())
            .then(sessionStorage.clear())
            .catch(error => console.log(error))
            }
        },
    }
</script>

<style scoped>
    .user{
        background-color: #FFD7D7;
        border: 5px solid #FD2D01;
        border-radius: 20px;
        box-shadow: 20px 5px 20px #4E5166;
        margin-bottom: 40px;
        font-weight: bolder;
    }
    
    .flex{
        display: flex;
        flex-direction: column;
    }

    form{
        width: 50%;
        margin: 20px auto;
    }

    input{
        margin: auto;
    }

    label{
        margin: 20px;
    }

    button{
        margin: 20px auto;
    }

    img{
        max-width: 310px;
        margin-top: 20px;
    }

    @media only screen and (max-width: 740px) {
        form{
            width: 90%;
        }

        label{
            margin: 20px 0px;
        }
    }
</style>