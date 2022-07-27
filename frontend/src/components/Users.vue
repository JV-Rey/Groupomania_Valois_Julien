<template>
    <div v-if="isAdmin">
        <img :src="user.imageUrl" alt="">
        <p>{{user.firstName + user.lastName}}</p>
        <p>email: {{user.email}}</p>
        <button @click="deleteUser()">Supprimer ce compte.</button>
    </div>
</template>

<script>
    export default{
    name: "UsersComp",
    props: {
        user: {
            type: Object,
            required: true
        }
    },
};
</script>