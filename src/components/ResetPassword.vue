<template>
    
    <div id="reset">
        
        <h2>Reset Password</h2>

        Email ID: <input type="email" id="emailId" v-model="formData.emailId"><br/>

        <div id="emailIdError" v-if="formError.emailIdError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.emailIdError }}</label>
        </div><br/>

        Old Password: <input type="password" v-model="formData.passwordOld" /><br/>

        <div id="passwordError" v-if="formError.passwordOldError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.passwordOldError }}</label>
        </div><br/>

        New Password: <input type="password" v-model="formData.passwordNew" /><br/>

        <div id="passwordError" v-if="formError.passwordNewError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.passwordNewError }}</label>
        </div><br/>

        <button @click="resetPassword()">Reset Password</button>

    </div>


</template>

<script>

import axios from 'axios';

export default {

    data() {
        return {
            formData: {
                emailId: '',
                passwordOld: '',
                passwordNew: ''
            },

            formError: {
                emailIdError: '',
                passwordOldError: '',
                passwordNewError: ''
            }
        }
    },

    methods: {
        resetPassword() {
            
            let that = this;

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/reset',
                data: that.formData
            })
            .then(function(response){

            })
            .catch(function(response){
                
            })
        }
    }
    
}
</script>