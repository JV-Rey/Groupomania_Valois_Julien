<template>
    <article class="article">
      <div class="comment">
        <p class="margin">{{comment.text}}</p>
        <img class="comment-image" src="{{comment.imageUrl}}">
      </div>
    </article>
</template>

<script>
    export default{
        name: 'CommentComp',
        props: {
            comment: {
                type: Object,
                required: true
            }
        },
    };
</script>

<style>
    .comment{
        background-color: #F2F2F2;
        border: 1px solid red;
        border-radius: 20px;
    }

    .margin{
        margin: 20px;
    }

    .comment-image{
        height: 340px;
    }
</style>