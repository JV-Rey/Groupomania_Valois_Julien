<template>
    <div class="header">
        <img src="../assets/icon-left-font.svg" alt="Logo Groupomania">
        <div class="navMarginTop">
            <div class="inlinePadding10">
                <a href="/" class="nav">Accueil</a>
                <a href="/newpost" class="nav">Creer un post</a>
            </div>
            <div class="inlinePadding10">
                <router-link :to="'/profile/' + userInfo.userId" class="nav">Votre profil</router-link>
                <a href="/login" @click="deleteTempInfo()" class="nav">Déconnection</a>
            </div>
        </div>
    </div>
    <h1>Bienvenue sur Groupomania!</h1>
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

    .inlinePadding10{
            display: inline;
        }


    .nav{
        margin: 20px;
        color: #FD2D01;
    }

    .navMarginTop{
        margin-top: 50px;
        justify-content: space-between;
    }

    img{
        width: 200px;
    }



    @media only screen and (max-width: 725px) {
        .header{
            display: block;
        }

        .inlinePadding10{
            padding: 10px;
            display: block;
        }
    }

</style>