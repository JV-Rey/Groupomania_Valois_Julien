<template>
  <section>
    <article class="article">
      <div class="author">
        <p>{{post.user.firstName + post.user.lastName}}</p>
        <p>Créé le {{post.createdAt}}</p>
        <p>modifié le {{post.uptatedAt}}</p>
      </div>
      <div class="post">
        <h2 class="margin">{{post.titre}}</h2>
        <p class="margin">{{post.text}}</p>
        <img class="post-image" :src="post.imageUrl">
        <button @click="likePost()">J'aime({{likes.likeCount}})</button>
        <button @click="dislikePost()">Je n'aime pas({{likes.dislikeCount}})</button>
        <button v-if="post.userId === userInfo.userId || userInfo.isAdmin" @click='toggle = !toggle'>Modifié votre post?</button>
          <form @submit.prevent="modifyPost()" v-show='toggle' class="flex" alt="formulaire de création de post">
            <label for="titre">Titre :</label>      
            <input type="text" name="titre" class="form-control" id="titre" v-model="titre" placeholder="ex : Titre du post" alt="renseigner le titre de votre post">
                
            <label for="text">Text :</label>
            <textarea id="text" name="text" rows="4" cols="50" v-model="text" placeholder="ex : Text de votre post" alt="renseigner le text de votre post"></textarea> 
                
            <label for="image">Image(optionel) :</label>
            <input type="file" ref="inputImg" name="image" id="image" accept="image/*" alt="ajouter une image">
            <button>finalisé votre post</button>
          </form>
        <button v-if="post.userId === userInfo.userId || userInfo.isAdmin" @click="deletePost($index)">Supprimer ce post</button>
      </div>
        <Comment v-for="comment in post.comments" :key="comment.id" :comment="comment"></Comment>
      <div>
        <router-link :to="'/newComment/' + post.id">Ajoutez un commentaire</router-link>
      </div>
    </article>
  </section>
</template>

<script>
import Comment from './Comment.vue';
  export default{
    name: "PostComp",
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        toggle: false,
        modifPost:{
          titre: this.post.titre,
          text: this.post.text,
        },
        likes: []
      }
    },
    components: { Comment },
     methods: {
      modifyPost(){
        let token = sessionStorage.getItem('token');
        let input = this.$refs.inputImg;
        let formData = new FormData();
        formData.append('titre', this.titre)
        formData.append('text', this.text)
        formData.append('image', input.files[0])
        const options = {
          method: "PUT",
          body: formData,
          headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch('http://localhost:3000/api/post/' + this.post.id, options)
        .then(res => res.json())
        .then(data => this.posts = data)
        .catch(error => console.log(error))
      },
      deletePost(){
        let token = sessionStorage.getItem('token');
        let postToDelete = this.post.id;
        postToDelete.remove;
        const options = {
          method: "delete",
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch('http://localhost:3000/api/post/' + this.post.id, options)
        .then(res => res.json())
        .then(data => this.posts = data)
        .catch(error => console.log(error))
      },
      // likePost(){
      //   let token = sessionStorage.getItem('token');
      //   if (likes.likeType == 0 && likes.likeType !== -1 && !likes.postId && !likes.userId) {
      //     likes.likeType = 1
      //   }else{
      //     likes.likeType = 0
      //   }
      //   const options = {
      //     method: "POST",
      //     headers: {
      //       'Content-type' : 'application/json',
      //       'Authorization' : 'Bearer ' + token
      //     }
      //   }
      //   fetch('http://localhost:3000/api/likes/' + likes.id, options)
      //   .then(res => res.json())
      //   .then(data => this.posts = data)
      //   .catch(error => console.log(error))
      // }
      }
  };
</script>

<style>
    .article{
        word-wrap: break-word;
        padding: 3% 20%;        
        background-color: #FFD7D7;
    }

    .post{
        background-color: #FFD7D7;
        border: 10px solid #FD2D01;
        border-radius: 20px;
        box-shadow: 20px 5px 20px #4E5166;
        margin-bottom: 40px;
    }

    .margin{
        margin: 20px;
    }

    .post-image{
        height: 340px;
    }
</style>