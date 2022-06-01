<template>
  <div class="greetings">
    <h1 class="red">{{  }}</h1>
    <h3>
      Vous êtes sur le site interne de Groupomania vous pouvez vous
      <a href="/signup">inscrire</a> ou vous
      <a href="/login">connecter</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
