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
        userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
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
        let articleToDelete = e.target.closest("article")
        articleToDelete.remove()
        const options = {
          method: "GET",
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch('http://localhost:3000/api/post/' + id, options)
        .then(res => res.json())
        .then(data => this.posts = data)
        .catch(error => console.log(error))
      }
    }
  }
</script>