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
        <p>J'aime({{post.like}})   Je n'aime pas({{post.dislike}})</p>
        <button v-if="post.userId === userInfo.userId || userInfo.isAdmin">Modifié votre post</button>
        <button v-if="post.userId === userInfo.userId || userInfo.isAdmin" @click="deletePost(e)">Supprimer ce post</button>
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
        userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
      }
    },
    components: { Comment }
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