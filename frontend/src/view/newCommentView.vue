<template>
    <h3>Vous pouvez publié un commentaire.</h3>
    <form @submit.prevent="createComment" alt="formulaire de création de commentaire">

      <div class="form-group">
        <label for="text">Text :</label>
        <textarea id="text" name="Comment" rows="4" cols="50" v-model="comment.text" placeholder="ex : Text de votre commentaire" alt="renseigner le text de votre commentaire"></textarea> 
      </div>

      <div class="form-group flex">
        <label for="image">Image(optionel) :</label>
        <input type="text" id="image" v-model="comment.imageUrl"  placeholder="ex : https//groupomania.fr/image" alt="ajouter une image">
        <input type="file" v-on:change="fileChange">
      </div>

    <button>Créer un commentaire</button>
  </form>
</template>

<script>
    export default {
    name: 'newCommentView',
    data(){
      return{
        comment: {
          text:"",
          imageUrl:"",
        }
      }
    },    
    methods: {
      fileChange(e) {
        let files = e.target.files;
        if (!files.length)
          return;
        this.createImage(files[0])
      },
      createComment(){
        let token = sessionStorage.getItem('token');
        const options = {
          method: "POST",
          body: JSON.stringify(this.comment),
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch("http://localhost:3000/api/comment", options)
        .then(res => res.json())
        .then(data => this.comment = data)
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