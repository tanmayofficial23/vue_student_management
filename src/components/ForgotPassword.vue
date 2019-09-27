<template>
    
    <div id="forgotpassword">
        
        <h2>Email Verification</h2>

        Email ID: <input type="email" id="emailId" v-model="emailId"><br/>

        <div id="emailIdError" v-if="emailIdError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ emailIdError }}</label>
        </div><br/>

        <button @click="generateResetLink">Send reset mail</button>

    </div>


</template>

<script>

import axios from 'axios';

export default {

    data() {
        return {

            emailId: '',
            emailIdError: '',
            baseUrl: ''
        }
    },

    methods: {

        generateResetLink() {
            
            if(this.emailId === '')
            {
                this.emailIdError = 'Email ID is mandatory!'
                return;
            }
            this.emailIdError = '';

            let that = this;

            this.baseUrl = window.location.origin;

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/resetmail',
                data: { 
                    'emailId': this.emailId ,
                    'baseUrl': this.baseUrl
                }
            })
            .then(function(response){
                console.log(response);
                
                alert(response.data.msg);
                that.$router.push({ name: 'login' });
            })
            .catch(function(error){
                console.log('ERROR', error);
            })
        }
    }
    
}
</script>