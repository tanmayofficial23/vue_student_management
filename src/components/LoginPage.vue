<template>
    
    <div class="container" id="login">
    
        <h2 style="display:inline-block">Login</h2>
        
        <a href="" @click="newRegistration()" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue; text-align:right; float:right; display:inline-block">New User?Register HERE!</a>
        
        <br/>
        
        Email ID: <input type="email" v-model="loginCredentials.emailId" /><br/>

        <div id="emailIdError" v-if="formError.emailIdError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.emailIdError }}</label>
        </div><br/>
        
        Password: <input type="password" v-model="loginCredentials.password" /><br/>

        <div id="passwordError" v-if="formError.passwordError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.passwordError }}</label>
        </div><br/>

        <button @click="loginButton">Login</button>
        <br/><br/>
        <a href="#" @click.prevent="forgotPassword()" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue">Forgot Password?</a>
        

        
    </div>

</template>

<script>

import axios from 'axios';

export default {

    name: 'login',

    data() {
        return {

            previousUrl: '',

            loginCredentials: {
                emailId: '',
                password: ''
            },

            formError: {
                emailIdError: '',
                passwordError: ''
            }
        }
    },

    beforeCreate() {
        this.previousUrl = document.referrer;
    },

    created() {

        if(localStorage.getItem('userToken'))
        {
            localStorage.removeItem('userToken');
        }
    },

    methods: {

        loginButton() {

            let that = this;

            if((this.loginCredentials.emailId === '') || (this.loginCredentials.password === ''))
            {
                if(this.loginCredentials.emailId === '')
                {
                    this.formError.emailIdError = 'Email ID is mandatory';
                }
                else
                {
                    this.formError.emailIdError = '';
                }

                if(this.loginCredentials.password === '')
                {
                    this.formError.passwordError = 'Password is mandatory';
                }
                else
                {
                    this.formError.passwordError = '';
                }

                return;
            }

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/login',
                data: that.loginCredentials
            })
            .then(function(response){

                let token = response.data.token;

                localStorage.setItem('userToken', token);

                that.$router.push({name: 'home'});

            })
            .catch(function(error){

                if(error.response.status === 401)
                {
                    alert(error.response.data.data["msg1"]);
                    alert(error.response.data.data["msg2"]);

                    return;
                }

                if(error.response.data.data[0]["emailId"])
                {
                    that.formError.emailIdError = error.response.data.data[0]["emailId"][0];
                }
                else
                {
                    that.formError.emailIdError = '';
                }
                
                if(error.response.data.data[0]["password"])
                {
                    that.formError.passwordError = error.response.data.data[0]["password"][0];
                }
                else
                {
                    that.formError.passwordError = '';
                }
            })
        },

        newRegistration(){
            this.$router.push({name: 'register'});
        },

        forgotPassword() {
            this.$router.push({ name: 'forgotpassword' });
        }
    }
    
}
</script>