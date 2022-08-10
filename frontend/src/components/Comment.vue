<template>
    <article class="article">
        <div class="author">
            <p>{{comment.user.firstName + comment.user.lastName}}</p>
            <p>Créé le {{comment.createdAt}}</p>
            <p>modifié le {{comment.uptatedAt}}</p>
        </div>
        <div class="comment">
            <p class="margin">{{comment.text}}</p>
        </div>
        <div>
            <button v-if="comment.userId === userInfo.userId || userInfo.isAdmin">Modifier ce commentaire</button>
            <button v-if="comment.userId === userInfo.userId || userInfo.isAdmin">Supprimer ce commentaire</button>
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
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
            }
        },
    };
</script>

<style>
    .comment{
        background-color: #FFD7D7;
        border: 3px solid #FD2D01;
        border-radius: 20px;
    }

    .margin{
        margin: 20px;
    }

    article{
        background-color: #FFD7D7;
        border: 5px solid #FD2D01;
        border-radius: 20px;
        box-shadow: 20px 5px 20px #4E5166;
        margin-bottom: 40px;
    }
</style>