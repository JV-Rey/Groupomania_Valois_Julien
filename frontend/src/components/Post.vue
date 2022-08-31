<template>
  <section>
    <article class="article">
      <div class="post flex">
        <p>{{post.user.firstName + ' ' + post.user.lastName}}</p>
        <p>Créé le {{post.createdAt}}</p>
        <p>modifié le {{post.uptatedAt}}</p>
        <h2 class="margin">{{post.titre}}</h2>
        <p class="margin">{{post.text}}</p>
        <img class="post-image" :src="post.imageUrl">
        <button @click="likePost()">J'aime({{likes.likeCount}})</button>
        <button @click="dislikePost()">Je n'aime pas({{likes.dislikeCount}})</button>
        <button v-if="post.userId === userInfo.userId || userInfo.isAdmin" @click='toggle = !toggle'>Modifié votre post?</button>
          <form class="flex" @submit.prevent="modifyPost()" v-show='toggle'  alt="formulaire de création de post">
            <label for="titre" class="margin">Titre :</label>      
            <input type="text" name="titre" class="margin" id="titre" v-model="modifPost.titre" alt="renseigner le titre de votre post">
                
            <label for="text">Text :</label>
            <textarea id="text" name="text" rows="4" cols="50" v-model="modifPost.text" alt="renseigner le text de votre post"></textarea> 
                
            <label for="image" class="margin">Image(optionel) :</label>
            <input type="file" class="margin" ref="inputImg" name="image" id="image" accept="image/*" alt="ajouter une image">
            <button class="margin">finalisé votre post</button>
          </form>
        <button v-if="post.userId === userInfo.userId || userInfo.isAdmin" @click="deletePost()">Supprimer ce post</button>
      </div>
      <div class="margin">
        <router-link :to="'/newComment/' + post.id" class="font">Ajoutez un commentaire</router-link>
      </div>
        <Comment v-for="comment in post.comments" :key="comment.id" :comment="comment"></Comment>
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
        formData.append('titre', this.modifPost.titre)
        formData.append('text', this.modifPost.text)
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
        .then(() => this.$router.go())
        .catch(error => console.log(error))
      },
      deletePost(){
        let token = sessionStorage.getItem('token');
        const options = {
          method: "delete",
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch('http://localhost:3000/api/post/' + this.post.id, options)
        .then(() => this.$router.go())
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

<style scoped>
    .article{
      word-wrap: break-word;
      padding: 3% 20%;        
      background-color: #FFD7D7;
      border: 12px solid #FD2D01;
      border-radius: 20px;
      box-shadow: 20px 5px 20px #FFD7D7;
      margin-bottom: 40px;
    }

    .post{
      background-color: #FFD7D7;
      border: 7px solid #FD2D01;
      border-radius: 20px;
      box-shadow: 20px 5px 20px #4E5166;
      
    }

    .margin{
        margin: 20px auto;
    }

    button{
      margin: 10px auto;
    }

    .post-image{
      width: 460px;
      margin: auto;
    }

    .flex {
      display: flex;
      flex-direction: column;
    }

    form {
        width: 35%;
        margin: 10px auto;
    }

    .font{
      font-size: larger;
      font-weight: bolder;
      color: #FD2D01;
    }
</style>