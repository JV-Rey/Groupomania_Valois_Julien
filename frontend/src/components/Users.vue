<template>
    <div>
        <img :src="user.imageUrl" alt="">
        <p>{{user.firstName + ' ' + user.lastName}}</p>
        <p>email: {{user.email}}</p>
        <button @click="deleteThisUser()">Supprimer ce compte.</button>
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
        deleteThisUser(){
                let token = sessionStorage.getItem('token');
                const options = {
                    method: "delete",
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    }
                }
            fetch('http://localhost:3000/api/auth/user/' + this.user.id, options)
            .then(res => res.json())
            .catch(error => console.log(error))
            }
    },
};
</script>