<template>
  <Header></Header>
  <h3>Vous pouvez créé et publié un post.</h3>
  <form @submit.prevent="createPost" class="flex" alt="formulaire de création de post">
    <label for="titre">Titre :</label>      
    <input type="text" name="titre" class="form-control" id="titre" v-model="titre" placeholder="ex : Titre du post" alt="renseigner le titre de votre post">
        
    <label for="text">Text :</label>
    <textarea id="text" name="text" rows="4" cols="50" v-model="text" placeholder="ex : Text de votre post" alt="renseigner le text de votre post"></textarea> 
        
    <label for="image">Image(optionel) :</label>
    <input type="file" name="image" id="image" accept="image/*" alt="ajouter une image">
    <button>Créer un post</button>
  </form>
</template>

<script>
  import Header from "../components/Header.vue";

    export default {
    name: 'newPostView',
    components: {
      Header
    },
    data(){
      return{        
          titre:"",
          text:"",
          //imageUrl:"",        
      }
    },    
    methods: {
      createPost(){
        let token = sessionStorage.getItem('token');
        let input = document.getElementById('image')
        let formData = new FormData();
        formData.append('titre', this.titre)
        formData.append('text', this.text)
        formData.append('image', input.files[0])
        const options = {
          method: "POST",
          body: formData,
          headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch("http://localhost:3000/api/post", options)
        .then(res => res.json())
        .then(data => this.post = data)
        .then(() => this.$router.push("/"))
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

  form{
    width: 50%;
    margin: 20px 25%;
  }

  label{
    margin: 20px;
  }

  button{
    margin: 20px;
  }
</style>