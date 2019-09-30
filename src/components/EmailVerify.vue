<template>
    
    <div id="verify">

        <h2>Your email is verified.</h2>

        <button @click="redirectLogin">Go to Login</button>
        
    </div>

</template>

<script>

import axios from 'axios';

export default {
    
    data() {
        return {
            token: ''
        }
    },

    created() {

        this.token = this.$route.query.token;

        let that = this;

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/verify',
            data: {
                'token': this.token
            }
        })
        .then(function(response){
            console.log(response);
            
            alert(response.data.data);
        })
        .catch(function(error){
            console.log(error.response);
        })
    },

    methods: {
        redirectLogin() {
            this.$router.push({ name: 'login'});
        }
    }
}
</script>