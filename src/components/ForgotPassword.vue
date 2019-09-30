<template>
    
    <div id="forgotpassword">
        
        <h2 style="display:inline-block; left-padding:50px">Email Verification</h2>

        <a href="" @click="loginRedirect()" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue; text-align:right; float:right; display:inline-block">Go back to Login!</a>
        <br/><br/>
        
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
            emailIdError: ''
        }
    },

    methods: {

        loginRedirect() {
            this.$router.push({ name: 'login' });
        },

        generateResetLink() {
            
            if(this.emailId === '')
            {
                this.emailIdError = 'Email ID is mandatory!'
                return;
            }
            this.emailIdError = '';

            let that = this;

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/resetmail',
                data: { 
                    'emailId': this.emailId ,
                }
            })
            .then(function(response){
                
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