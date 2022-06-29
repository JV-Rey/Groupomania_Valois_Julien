<template>
  <Header></Header>
  <Post v-for="post in posts" :key="post.id" :post="post"></Post>
  <Comment v-for="comment in comments" :key="comment.id" :comment="comment"></Comment>
</template>

<script>
  import Header from "../components/Header.vue";
  import Post from "@/components/Post.vue";
  import Comment from "../components/Comment.vue";

  export default {
    name: 'homeView',
    components: {
    Header,
    Post,
    Comment
  },
    data(){
      return {
        posts: [],
        comments: []
      }
    },
    created(){
      this.getAllPosts();
      this.getAllComments()
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
      },
      getAllComments(){
        let token = sessionStorage.getItem('token');
        const options = {
          method: "GET",
          headers: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch('http://localhost:3000/api/comment', options)
        .then(res => res.json())
        .then(data => this.comments = data)
        .catch(error => console.log(error))
      }
    }
  }
</script>