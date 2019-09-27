<template>
    
    <div id="verify">
        
    </div>

</template>

<script>

import axios from 'axios';

export default {
    
    data() {
        return {

            emailId: '',
            token: ''
        }
    },

    created() {

        this.emailId = this.$route.query.emailId;
        this.token = this.$route.query.token;

        let that = this;

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/verify',
            data: {
                'emailId': this.emailId,
                'token': this.token
            }
        })
        .then(function(response){
            
            alert(response.data.data);

            that.$router.push({ name: 'login'});
        })
        .catch(function(error){
            console.log(error.response);
        })
    }
}
</script>