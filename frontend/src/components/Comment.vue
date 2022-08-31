<template>
    <div>
        <div class="comment">
            <p>{{comment.user.firstName + ' ' + comment.user.lastName}}</p>
            <p>Créé le {{comment.createdAt}}</p>
            <p>modifié le {{comment.uptatedAt}}</p>
            <p class="margin textComment">{{comment.text}}</p>
        </div>
        <div>
            <button class="margin" v-if="comment.userId === userInfo.userId || userInfo.isAdmin" @click='toggle = !toggle'>Modifier ce commentaire</button>
                <form @submit.prevent="modifyComment()" v-show='toggle'  alt="formulaire de création de post">
                    <label for="text">Text :</label>
                    <textarea class="marginTop" id="text" name="text" rows="4" cols="50" v-model="modifComment.text" alt="renseigner le text de votre post"></textarea> 
                    <button class="margin">finalisé votre post</button>
                </form>
            <button @click="deleteComment()" v-if="comment.userId === userInfo.userId || userInfo.isAdmin">Supprimer ce commentaire</button>
        </div>
    </div>
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
                userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                toggle: false,
                modifComment:{
                    text: this.comment.text,
                },
            }
        },
        methods: {
            modifyComment(){
                let token = sessionStorage.getItem('token');
                const options = {
                method: "PUT",
                body: JSON.stringify(this.modifComment),
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                }
                }
                fetch('http://localhost:3000/api/comment/' + this.comment.id, options)
                .then(res => res.json())
                .then(data => this.comments = data)
                .catch(error => console.log(error))
            },
            deleteComment(){
                let token = sessionStorage.getItem('token');
                const options = {
                method: "delete",
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                }
                }
                fetch('http://localhost:3000/api/comment/' + this.comment.id, options)
                .catch(error => console.log(error))
            }
        },
    };
</script>

<style scoped>
    .comment{
        background-color: #FFD7D7;
        border: 5px solid #FD2D01;
        border-radius: 20px;
        box-shadow: 20px 5px 20px #4E5166;
    }

    .margin{
        margin: 20px auto;
    }

    .marginTop{
        margin-top: 10px auto;
    }

    .textComment{
        font-weight: bold;
    }
</style>