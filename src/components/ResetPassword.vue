<template>
    
    <div id="reset">

        <center>

            <h2>Reset Password</h2>

            Password: <input type="password" v-model="formData.password" /><br/>

            <div id="passwordError" v-if="formError.passwordError !== ''">
                <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.passwordError }}</label>
            </div><br/>

            Re-type Password: <input type="password" v-model="formData.passwordConfirm" /><br/>

            <div id="passwordConfirmError" v-if="formError.passwordConfirmError !== ''">
                <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.passwordConfirmError }}</label>
            </div><br/>
            <button @click="resetPassword()">Reset Password</button>

        </center>

    </div>

</template>

<script>

import axios from 'axios';

export default {

    data() {
        return {

            emailId: '',

            token: '',

            formData: {
                password: '',
                passwordConfirm: ''
            },

            formError: {
                passwordError: '',
                passwordConfirmError: ''
            }
        }
    },

    methods: {

        resetPassword() {

            if((this.formData.password === '') || (this.formData.passwordConfirm === ''))
            {
                if(this.formData.password === '')
                {
                    this.formError.passwordError ='This field is mandatory';
                }
                else
                {
                    this.formError.passwordError = '';
                }

                if(this. formData.passwordConfirm === '')
                {
                    this.formError.passwordConfirmError ='This field is mandatory';
                }
                else
                {
                    this.formError.passwordConfirmError = '';
                }

                return;
            }

            if((this.formError.password !== '') || (this.formError.passwordConfirm !== ''))
            {
                if(this.formData.password !== this.formData.passwordConfirm)
                {
                    alert('Password didn\'t matched!!!');

                    this.formError.passwordError = '';
                    this.formError.passwordConfirmError = '';

                    return;
                }
                else
                {
                    this.formError.passwordError = '';
                    this.formError.passwordConfirmError = '';
                }
            }

            let that = this;

            this.emailId = this.$route.query.emailId;
            this.token = this.$route.query.token;

            // console.log('Email ID: ', this.emailId);
            // console.log('Token: ', this.token);
            // console.log('password', this.password);

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/setnewpass',
                data: {
                    'emailId': that.emailId,
                    'token': that.token,
                    'password': that.formData.password
                }
            })
            .then(function(response){
                alert(response.data.data);
                that.$router.push({ name: 'login' });
            })
            .catch(function(error){
                
                console.log(error.response);

                if(error.response.status === 409)
                {
                    alert(error.response.data.error);
                    return;
                }
                if(error.response.status === 401)
                {
                    alert(error.response.data.error);
                    that.$router.push({ name: 'login' });
                    return;
                }

                if(error.response.status === 400)
                {
                    if(error.response.data.data[0]['emailId'])
                    {
                        alert('No Email ID was found for the request!');
                    }
                    if(error.response.data.data[0]['password'])
                    {
                        alert(error.response.data.data[0]['password']);
                    }
                    if(error.response.data.data[0]['token'])
                    {
                        alert('No token was found for the request');
                    }

                    return;
                }

                return;
            })
        }
    }
}
</script>