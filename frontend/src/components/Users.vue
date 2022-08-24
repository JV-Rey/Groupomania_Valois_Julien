<template>
    <div>
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
    methods: {
        deleteUser(){
                let token = sessionStorage.getItem('token');
                let id = this.$route.params.id  
                const options = {
                    method: "delete",
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    }
                }
            fetch('http://localhost:3000/api/auth/user/' + id, options)
            .then(res => res.json())
            .then(sessionStorage.clear())
            .catch(error => console.log(error))
            }
    },
};
</script>