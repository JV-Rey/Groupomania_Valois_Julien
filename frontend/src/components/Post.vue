<template>
  <section>
    <article class="article">
      <div class="post">
        <h2 class="margin">{{post.titre}}</h2>
        <p class="margin">{{post.text}}</p>
        <img class="post-image" src="{{post.imageUrl}}">
      </div>
      <!-- <a href="/{{post.id}}" class="post">>
        <h2 class="margin">{{post.titre}}</h2>
        <p class="margin">{{post.text}}</p>
        <img class="post-image" src="{{post.imageUrl}}">
      </a> -->
      <div>
        <a href="/newComment">Ajoutez un commentaire</a>
      </div>
    </article>
  </section>
</template>

<script>
    export default{
        name: 'PostComp',
        props: {
            post: {
                type: Object,
                required: true
            }
        },
    };
</script>

<style>
    .article{
        word-wrap: break-word;
        padding: 3% 20%;        
    }

    .post{
        background-color: #F2F2F2;
        border: 1px solid red;
        border-radius: 20px;
    }

    .margin{
        margin: 20px;
    }

    .post-image{
        height: 340px;
    }
</style>