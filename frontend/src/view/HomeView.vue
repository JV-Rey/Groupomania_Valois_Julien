<template>
  <Header></Header>
  <Post v-for="post in posts" :key="post.id" :post="post"></Post>
</template>

<script>
  import Header from "../components/Header.vue";
  import Post from "@/components/Post.vue";

  export default {
    name: 'homeView',
    components: {
    Header,
    Post
  },
    data(){
      return {
        posts: [],
        modifPost:{
          titre:'',
          text:''
        }
      }
    },
    created(){
      this.getAllPosts();
    },
    methods: {
      getAllPosts(){
        let token = sessionStorage.getItem('token');
        const options = {
          method: "GET",
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch('http://localhost:3000/api/post', options)
        .then(res => res.json())
        .then(data => this.posts = data)
        .catch(error => console.log(error))
        console.log(this.posts);
      },
      deletePost(e){
        let token = sessionStorage.getItem('token');
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        let articleToDelete = e.target.closest("article")
        articleToDelete.remove()
        const options = {
          method: "GET",
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch('http://localhost:3000/api/post/' + userInfo.userId, options)
        .then(res => res.json())
        .then(data => this.posts = data)
        .catch(error => console.log(error))
      },
      // modifyPost(){
      //   let token = sessionStorage.getItem('token');
      //   let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      //   let input = document.getElementById('image');
      //   let formData = new FormData();
      //   formData.append('titre', this.modifPost.titre)
      //   formData.append('text', this.modifPost.text)
      //   formData.append('image', input.files[0])
      //   const options = {
      //     method: "PUT",
      //     body: formData,
      //     headers: {
      //       //'Content-Type': 'multipart/form-data',
      //       'Authorization' : 'Bearer ' + token
      //     }
      //   }
      //   fetch('http://localhost:3000/api/post/' + userInfo.userId, options)
      //   .then(res => res.json())
      //   .then(data => this.posts = data)
      //   .catch(error => console.log(error))
      // }
      // likePost(){
      //   let token = sessionStorage.getItem('token');
      //   if (likes.likeType == 0 && likes.likeType !== -1 && !likes.postId && !likes.userId) {
      //     likes.likeType = 1
      //   }else{
      //     likes.likeType = 0
      //   }
      //   const options = {
      //     method: "POST",
      //     headers: {
      //       'Content-type' : 'application/json',
      //       'Authorization' : 'Bearer ' + token
      //     }
      //   }
      //   fetch('http://localhost:3000/api/likes/' + likes.id, options)
      //   .then(res => res.json())
      //   .then(data => this.posts = data)
      //   .catch(error => console.log(error))
      // }
    }
  }
</script>