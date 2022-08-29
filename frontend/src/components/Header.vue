<template>
    <div class="header">
        <img src="../assets/icon-left-font.svg" alt="Logo Groupomania">
        <div class="nav-margin-top">
            <a href="/" class="nav">Acceuil</a>
            <a href="/newpost" class="nav">Creer un post</a>
            <router-link :to="'/profile/' + userInfo.userId" class="nav">Votre profile</router-link>
            <a href="/login" @click="deleteTempInfo()" class="nav">Déconnection</a>
        </div>
    </div>
    <h1>Bienvenu sur Groupomania!</h1>
</template>

<script>
    export default{
        name:'headerComp',
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
            }
        },
        methods: {
            deleteTempInfo(){
                window.onunload = function () {
                    sessionStorage.clear();
                }                
            }
        }
    }
</script>

<style scoped>
    .header{
        display: flex;
        justify-content: space-between;
    }

    .nav{
        margin: 20px;
        color: #FD2D01;
    }

    .nav-margin-top{
        margin-top: 50px;
    }

    img{
        width: 200px;
    };

    h1{
        color: #FD2D01;
        margin-top: 20px;
    }
</style>