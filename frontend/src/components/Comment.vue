<template>
    <article class="article">
        <div class="author">
            <p>{{user.firstName + user.lastName}}</p>
            <p>Créé le {{comment.createdAt}}</p>
            <p>modifié le {{comment.uptatedAt}}</p>
        </div>
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
        background-color: #FFD7D7;
        border: 1px solid #FD2D01;
        border-radius: 20px;
    }

    .margin{
        margin: 20px;
    }

    .comment-image{
        height: 340px;
    }
</style>