<template>
    
    <div id="insert">

        <h2>Insert Student Details</h2>

        Name: <input type="text" id="name" v-model="studentDetails.name"><br/>

        <div id="nameError" v-if="formError.nameError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.nameError }}</label>
        </div><br/>

        Email ID: <input type="email" id="emailId" v-model="studentDetails.emailId"><br/>

        <div id="emailIdError" v-if="formError.emailIdError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.emailIdError }}</label>
        </div><br/>

        Phone No: <input type="number" id="phoneNo" v-model="studentDetails.phoneNo"><br/>

        <div id="phoneNoError" v-if="formError.phoneNoError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.phoneNoError }}</label>
        </div><br/>

        Courses : 
        <input type="checkbox" id="course[]" name="courses[]" value="hindi" v-model="studentDetails.courses" />Hindi
        <input type="checkbox" id="course[]" name="courses[]" value="english" v-model="studentDetails.courses" />English
        <input type="checkbox" id="course[]" name="courses[]" value="maths" v-model="studentDetails.courses" />Maths
        <input type="checkbox" id="course[]" name="courses[]" value="social_studies" v-model="studentDetails.courses" />Social Studies
        <input type="checkbox" id="course[]" name="courses[]" value="physics" v-model="studentDetails.courses" />Physics
        <input type="checkbox" id="course[]" name="courses[]" value="chemistry" v-model="studentDetails.courses" />Chemistry
        <input type="checkbox" id="course[]" name="courses[]" value="biology" v-model="studentDetails.courses" />Biology

        <div id="coursesError" v-if="formError.coursesError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.coursesError }}</label>
        </div>

        <br/><br/>

        <button id="updatebutton" @click="newUserRecord()">Insert Record</button>

    </div>

</template>

<script>

import axios from 'axios';

export default {

    name: 'insert',
    
    data() {
        return {
            studentDetails: {
                name: '',
                emailId: '',
                phoneNo: '',
                courses: []
            },

            formError: {
                nameError: '',
                phoneNoError: '',
                emailIdError: '',
                coursesError: ''
            }
        }
    },

    created() {
        if(!localStorage.getItem('userToken'))
        {
            alert("You need to login");

            this.$router.push({ name: 'login' });
            return;
        }
    },

    methods: {        
        newUserRecord() {

            let that = this;

            if((this.studentDetails.name === '') || (this.studentDetails.emailId === '') || (this.studentDetails.phoneNo === '') || (this.studentDetails.courses.length === 0))
            {

                if(this.studentDetails.name === '')
                {
                    this.formError.nameError = 'Name is mandatory';
                }
                else
                {
                    this.formError.nameError = '';
                }

                if(this.studentDetails.emailId === '')
                {
                    this.formError.emailIdError = 'Email ID is mandatory';
                }
                else
                {
                    this.formError.emailIdError = '';
                }
                
                if(this.studentDetails.phoneNo === '')
                {
                    this.formError.phoneNoError = 'Phone Number is mandatory';
                }
                else
                {
                    this.formError.phoneNoError = '';
                }
                
                if(this.studentDetails.courses.length === 0)
                {
                    this.formError.coursesError = 'At least one course must be selected';
                }
                else
                {
                    this.formError.coursesError = '';
                }

                return;
            }

            let token = localStorage.getItem('userToken');

            if(!token)
            {
                alert("You need to login");

                this.$router.push({ name: 'login' });
                return;
            }

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/students/create',
                data: that.studentDetails,
                headers:{ 'Authorization': `Bearer ${token}`}
            })
            .then(function(response){
                that.$router.push({ name: 'home' });
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
                
                if(error.response.data.data[0]["phoneNo"])
                {
                    that.formError.phoneNoError = error.response.data.data[0]["phoneNo"][0];
                }
                else
                {
                    that.formError.phoneNoError = '';
                }

                if(error.response.data.data[0]["courses"])
                {
                    that.formError.coursesError = 'Atleast one course must be selected';
                }
                else
                {
                    that.formError.coursesError = '';
                }
            })
        }
    }
}

</script>