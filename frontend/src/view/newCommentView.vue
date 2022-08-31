<template>
  <Header></Header>
  <div class="color">
    <h3>Vous pouvez publié un commentaire.</h3>
    <form class="flex" @submit.prevent="createComment" alt="formulaire de création de commentaire">
        <label for="text">Text :</label>
        <textarea class="margin" id="text" name="Comment" rows="4" cols="50" v-model="comment.text" placeholder="ex : Text de votre commentaire" alt="renseigner le text de votre commentaire"></textarea>
    <button class="margin">Créer un commentaire</button>
  </form>
  </div>
</template>

<script>
  import Header from "../components/Header.vue";

    import { useRoute } from 'vue-router'
    export default {      
    name: 'newCommentView',
    components: {
      Header
    },
    setup() {
      const route = useRoute();
      console.log(route.params.id);
    },
    data(){
      return{
        comment: {
          text:"",
          postId: this.$route.params.id,
        }
      }
    },    
    methods: {
      createComment(){
        let token = sessionStorage.getItem('token');
        const options = {
          method: "POST",
          body: JSON.stringify(this.comment),
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch("http://localhost:3000/api/comment", options)
        .then(res => res.json())
        .then(data => this.comment = data)
        .then(() => this.$router.push("/"))
        .catch(error => console.log(error))
      }     
    },
  }
</script>

<style scoped>
  .flex{
    display: flex;
    flex-direction: column;
  }

  .margin{
    margin: 10px auto;
  }

  .color{
    background-color: #FFD7D7;
    border: 10px solid #FD2D01;
    border-radius: 20px;
    box-shadow: 20px 5px 20px #4E5166;
  }
</style>