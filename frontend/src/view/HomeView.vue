<template>
  <section>
    <h1>Bienvenu sur Groupomania!</h1>
    <article class="article">
      <div class="post">
        <h2 class="margin">{{post.titre}}</h2>
        <p class="margin">{{post.text}}</p>
        <img class="post-image" src="{{post.image}}">
      </div>
    </article>
  </section>
</template>

<script>
  export default {
    name: 'homeView',
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
        .then(token => this.getAllPosts(token))
        /*let elt = document.getElementsByClassName('article') 
        let elt2 = document.getElementsByClassName('post') 
        .then( posts => {
          for (const post of posts) {
              elt2.innerHTML += elt.innerHTML;
          }
        })*/
        .catch(error => console.log(error))
      }      
    }
  }
</script>