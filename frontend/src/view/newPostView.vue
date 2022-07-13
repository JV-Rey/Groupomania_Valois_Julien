<template>
    <h3>Vous pouvez créé et publié un post.</h3>
  <form @submit.prevent="createPost" alt="formulaire de création de post">
        <label for="titre">Titre :</label>      
        <input type="text" name="titre" class="form-control" id="titre" v-model="titre" placeholder="ex : Titre du post" alt="renseigner le titre de votre post">
        <label for="text">Text :</label>
        <textarea id="text" name="text" rows="4" cols="50" v-model="text" placeholder="ex : Text de votre post" alt="renseigner le text de votre post"></textarea> 
        <label for="image">Image(optionel) :</label>
        <input type="file" name="image" id="image" accept="image/*" alt="ajouter une image">


      <!-- <div class="form-group">
        <label for="titre">Titre :</label>      
        <input type="text" class="form-control" id="titre" v-model="post.titre" placeholder="ex : Titre du post" alt="renseigner le titre de votre post">
      </div>

      <div class="form-group">
        <label for="text">Text :</label>
        <textarea id="text" name="Post" rows="4" cols="50" v-model="post.text" placeholder="ex : Text de votre post" alt="renseigner le text de votre post"></textarea> 
      </div>

      <div class="form-group flex">
        <label for="image">Image(optionel) :</label>
        <input type="text" id="image" v-model="post.imageUrl"  placeholder="ex : https//groupomania.fr/image" alt="ajouter une image">
        <input type="file">
      </div> -->

    <button>Créer un post</button>
  </form>
</template>

<script>
    export default {
    name: 'newPostView',
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
        // formData.append('titre', this.imageUrl)
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