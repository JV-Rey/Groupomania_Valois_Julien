<template>
  <Header></Header>
  <div class="color">
    <h3>Vous pouvez créer et publier un post.</h3>
    <form @submit.prevent="createPost()" class="flex" alt="formulaire de création de post">
      <label class="margin" for="titre">Titre :</label>      
      <input type="text" name="titre" class="form-control" id="titre" v-model="titre" placeholder="ex : Titre du post" alt="renseigner le titre de votre post">
          
      <label class="margin" for="text">Texte :</label>
      <textarea id="text" name="text" rows="4" cols="50" v-model="text" placeholder="ex : Text de votre post" alt="renseigner le texte de votre post"></textarea> 
          
      <label class="margin" for="image">Image(optionnelle) :</label>
      <input class="center" type="file" name="image" id="image" accept="image/*" alt="ajouter une image">
      <button class="margin">Créer un post</button>
    </form>
  </div>
</template>

<script>
  import Header from "../components/Header.vue";

    export default {
    name: 'newPostView',
    components: {
      Header
    },
    data(){
      return{        
          titre:"",
          text:""     
      }
    },    
    methods: {
      createPost(){
        let token = sessionStorage.getItem('token');
        let input = document.getElementById('image')
        let formData = new FormData();
        formData.append('titre', this.titre)
        formData.append('text', this.text)
        formData.append('image', input.files[0])
        const options = {
          method: "POST",
          body: formData,
          headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch("http://localhost:3000/api/post", options)
        .then(res => res.json())
        .then(data => this.post = data)
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

  form{
    width: 35%;
    margin: 20px auto;
  }

  .margin{
    margin: 20px 0px;
  }

  .center{
    margin: auto;
  }

  .color{
      background-color: #FFD7D7;
      border: 10px solid #FD2D01;
      border-radius: 20px;
      box-shadow: 20px 5px 20px #4E5166;
    }

    @media only screen and (max-width: 740px) {
      form{
        width: 75%;
      }
    }
</style>