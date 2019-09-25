<template>
    
    <div class="contatiner" id="register">

        <h2 style="display:inline-block">Registration</h2>
        
        <a href="" @click="loginRedirect()" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue; float:right; display:inline-block">Already a User?LOGIN HERE!</a>

        <br/>
        Name: <input type="text" v-model="newUserDetails.name"><br/>

        <div id="nameError" v-if="formError.nameError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.nameError }}</label>
        </div><br/>

        Password: <input type="password" v-model="newUserDetails.password"><br/>
        
        <div id="passwordError" v-if="formError.passwordError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.passwordError }}</label>
        </div><br/>
        
        
        Email ID: <input type="email" v-model="newUserDetails.emailId"><br/>

        <div id="emailIdError" v-if="formError.emailIdError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.emailIdError }}</label>
        </div><br/>

        <button @click="registerButton">Register</button>
        <br/><br/>


    </div>

</template>

<script>

import axios from 'axios';

export default {
      
    name: 'register',

    data() {

        return  {
            newUserDetails: {
            name: '',
            password: '',
            emailId: ''
            },

            formError: {
                nameError: '',
                passwordError: '',
                emailIdError: ''
            }
        }
    },

    methods: {
        registerButton() {

            let that = this;

            if((that.newUserDetails.name === '') || (that.newUserDetails.password === '') || (that.newUserDetails.emailId === ''))
            {
                
                if(that.newUserDetails.name === '')
                {
                    that.formError.nameError = 'Name is mandatory';
                }
                else
                {
                    that.formError.nameError = '';
                }

                if(that.newUserDetails.password === '')
                {
                    that.formError.passwordError = 'Password is mandatory';
                }
                else
                {
                    that.formError.passwordError = '';
                }

                if(that.newUserDetails.emailId === '')
                {
                    that.formError.emailIdError = 'Email ID is mandatory';
                }
                else
                {
                    that.formError.emailIdError = '';
                }
                
                return;
            }

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/register',
                data: that.newUserDetails
            })
            .then(function(response){
                let token = response.data.token;
                localStorage.setItem('userToken',token);
                that.$router.push({name: 'home'});

            })
            .catch(function(error){
                
                if(error.response.data.data[0]["name"])
                {
                    that.formError.nameError = error.response.data.data[0]["name"][0];
                }
                else
                {
                    that.formError.nameError = '';
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

        loginRedirect() {
            this.$router.push({ name: 'login' });
        }
    }
}
</script>