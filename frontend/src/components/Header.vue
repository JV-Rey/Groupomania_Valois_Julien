<template>
    <div class="header">
        <img src="../assets/icon-left-font.svg" alt="Logo Groupomania">
        <div class="nav-margin-top">
            <a href="/" class="nav">Acceuil</a>
            <a href="/newpost" class="nav">Creer un post</a>
            <a href="/signup" class="nav">Déconnection</a>
        </div>
    </div>
    <h1>Bienvenu sur Groupomania!</h1>
</template>

<script>
    export default{
        name:'headerComp'
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