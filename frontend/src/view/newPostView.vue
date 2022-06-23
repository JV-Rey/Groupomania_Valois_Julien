<template>
    <h3>Vous pouvez créé et publié un post.</h3>
  <form @submit.prevent="createPost" alt="formulaire d'inscription à Groupomania">
      <div class="form-group">
        <label for="titre">Titre :</label>      
        <input type="text" class="form-control" id="titre" v-model="post.titre" placeholder="ex : Titre du post" alt="renseigner le titre de votre post">
      </div>

      <div class="form-group">
        <label for="text">Text :</label>
        <textarea id="text" name="Post" rows="4" cols="50" v-model="post.text" placeholder="ex : Text de votre post" alt="renseigner le text de votre post"></textarea> 
      </div>

      <div class="form-group flex">
        <label for="image">Image(optionel) :</label>
        <input type="text" id="image" v-model="post.image"  placeholder="ex : https//groupomania.fr/image" alt="renseigner votre nom">
        <input type="file">
      </div>

    <button>Créer un post</button>
  </form>
</template>

<script>
    export default {
    name: 'newPostView',
    data(){
      return{
        post: {
          titre:"",
          text:"",
          image:"",
        }
      }
    },    
    methods: {
      createPost(){
        const options = {
          method: "POST",
          body: JSON.stringify(this.post),
          headers: {
            'Content-type' : 'application/json'
          }
        }
        fetch("http://localhost:3000/api/post", options)
        .then(res => res.json())
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