<template>
  <section>
    <article class="article">
      <div class="author">
        <p>{{user.firstName + user.lastName}}</p>
        <p>Créé le {{post.createdAt}}</p>
        <p>modifié le {{post.uptatedAt}}</p>
      </div>
      <div class="post">
        <h2 class="margin">{{post.titre}}</h2>
        <p class="margin">{{post.text}}</p>
        <img class="post-image" src="{{post.imageUrl}}">
      </div>
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment"></Comment>
      <div>
        <a href="/newComment">Ajoutez un commentaire</a>
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
    components: { Comment }
};
</script>

<style>
    .article{
        word-wrap: break-word;
        padding: 3% 20%;        
    }

    .post{
        background-color: #FFD7D7;
        border: 1px solid #FD2D01;
        border-radius: 20px;
    }

    .margin{
        margin: 20px;
    }

    .post-image{
        height: 340px;
    }
</style>