<template>
    
    <div id="edit">

        <h2>Edit Details</h2>

        <h4 v-if="studentId !== 0">Edit data for ID: {{ studentId }}</h4>

        Name: <input type="text" id="name" v-model="userDetails.name"><br/>

        <div id="nameError" v-if="formError.nameError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.nameError }}</label>
        </div><br/>

        Email ID: <input type="email" id="emailId" v-model="userDetails.emailId"><br/>

        <div id="emailIdError" v-if="formError.emailIdError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.emailIdError }}</label>
        </div><br/>

        Phone No: <input type="number" id="phoneNo" v-model="userDetails.phoneNo"><br/>

        <div id="phoneNoError" v-if="formError.phoneNoError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.phoneNoError }}</label>
        </div><br/>

        Courses : <input type="checkbox" id="course[]" name="courses[]" value="hindi" v-model="userDetails.courses" :checked="true" />Hindi
        <input type="checkbox" id="course[]" name="courses[]" value="english" v-model="userDetails.courses" />English
        <input type="checkbox" id="course[]" name="courses[]" value="maths" v-model="userDetails.courses" />Maths
        <input type="checkbox" id="course[]" name="courses[]" value="social_studies" v-model="userDetails.courses" />Social Studies
        <input type="checkbox" id="course[]" name="courses[]" value="physics" v-model="userDetails.courses" />Physics
        <input type="checkbox" id="course[]" name="courses[]" value="chemistry" v-model="userDetails.courses" />Chemistry
        <input type="checkbox" id="course[]" name="courses[]" value="biology" v-model="userDetails.courses" />Biology

        <div id="coursesError" v-if="formError.coursesError !== ''">
            <label style="font-size:12px; font-family:sans-serif; font-weight:bold; color:red">{{ formError.coursesError }}</label>
        </div><br/><br/>

        <button id="updatebutton" @click="updateRecord(userDetails)">Update Record</button>

    </div>
</template>

<script>

import axios from 'axios';

export default {
    
    data() {
        return {
            studentId: 0,

            userDetails: {
                id: 0,
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

        this.studentId = this.$route.params.paramData.studentDetails.id;
        this.userDetails.id = this.studentId;

        this.userDetails.name = this.$route.params.paramData.studentDetails.name;
        this.userDetails.emailId = this.$route.params.paramData.studentDetails.email_id;
        this.userDetails.phoneNo = this.$route.params.paramData.studentDetails.phone_no;
        this.userDetails.courses = this.$route.params.paramData.selectedCourses;

        console.log(this.userDetails.courses);
    },

    methods: {
        updateRecord(userDetails) {
            let that = this;
            
            if((that.userDetails.name === '') || (that.userDetails.emailId === '') || (that.userDetails.phoneNo === ''))
            {
                
                if(that.userDetails.name === '')
                {
                    that.formError.nameError = 'Name is mandatory';
                }
                else
                {
                    that.formError.nameError = '';
                }

                if(that.userDetails.emailId === '')
                {
                    that.formError.emailIdError = 'Email ID is mandatory';
                }
                else
                {
                    that.formError.emailIdError = '';
                }
                
                if(that.userDetails.phoneNo === '')
                {
                    that.formError.phoneNoError = 'Phone number is mandatory';
                }
                else
                {
                    that.formError.phoneNoError = '';
                }
                
                
                if(that.userDetails.courses.length === 0)
                {
                    that.formError.coursesError = 'At least one course must be selected';
                }
                else
                {
                    that.formError.coursesError = '';
                }

                return;
            }

            if((that.formError.nameError !== '') && (that.formError.emailIdError !== '') && (that.formError.phoneNoError !== ''))
            {
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
                url: 'http://127.0.0.1:8000/api/edit',
                headers:{ 'Authorization': `Bearer ${token}`},
                data: that.userDetails
            })
            .then(function(response){
                alert('Record Updated!!!');

                that.$router.push({ name: 'home' })
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
                    that.formError.coursesError = 'At least one course must be selected';
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