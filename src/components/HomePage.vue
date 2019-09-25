<template>

    <div id="home">

        <h2 style="display:inline-block">Students Details</h2>

        <a href="" @click="logout()" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue; float:right; width:50px; text-align:right; display:inline-block">Logout</a>

        <table class="table">

            <tr>

                <th v-for="header in tableData.tableHeaders" :key="header">{{ header }}</th>

                <th colspan="2">Action</th>

            </tr>

            <tr v-for="student in tableData.studentDetails" :key="student.id">

                <td v-for="detail in student" :key="detail">{{ detail }}</td>

                <td><a href="" @click="editStudent(student)" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue; margin-right:10px; margin-left:10px">Edit</a></td>
                <td><a href="" @click="deleteStudent(student)" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue; margin-right:10px; margin-left:10px">Delete</a></td>

            </tr>

        </table>

        <a href="" @click="newEntry()" style="font-size:12px; font-family:sans-serif; font-weight:bold; color:blue">Insert a new Record</a>

    </div>

</template>

<script>

import axios from 'axios';

export default {
    
    name: 'home',

    data() {

        return  {
            tableData: {
                tableHeaders: [],
                studentDetails: []
            },
            student: []
        }
    },

    created() {
        let that = this;
        let token = localStorage.getItem('userToken');

        if(!token)
        {
            alert("You need to login");

            this.$router.push({ name: 'login' });
            return;
        }

        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/show',
            headers: { 'Authorization': `Bearer ${token}`}
        })
        .then(function(response){
            that.tableData.tableHeaders = response.data.tableHeaders;
            that.tableData.studentDetails = response.data.data;
        })
        .catch(function(error){
            alert(error.response.statusText+". Please login again");
            that.$router.push('login');
        })
    },

    methods: {

        newEntry() {
            
            let token = localStorage.getItem('userToken');

            if(!token)
            {
                alert("You need to login");
                return;
            }

            this.$router.push({ name: 'insert' });
        },

        editStudent(studentDetails) {

            let that = this;
            let token = localStorage.getItem('userToken');
            
            if(!token)
            {
                alert("You need to login");

                this.$router.push({ name: 'login' });
                return;
            }

            let id = studentDetails.id;

            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/edit/'+id,
                headers:{ 'Authorization': `Bearer ${token}`}
            })
            .then(function(response){

                let paramData = response.data.data;
                
                that.$router.push({ name: 'edit', params: { paramData }});
            })
            .catch(function(error){
                alert(error.response.data.data);
            })
        },

        deleteStudent(studentDetails) {
            let that = this;
            let token = localStorage.getItem('userToken');

            if(!token)
            {
                alert("You need to login");

                this.$router.push({ name: 'login' });
                return;
            }

            let id = studentDetails.id;

            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/delete/'+id,
                headers:{ 'Authorization': `Bearer ${token}`}
            })
            .then(function(response){

                alert("ID:"+response.data.data+" is deleted!");
                window.location.reload();
            })
        },

        logout() {
            
            let that = this;
            let token = localStorage.getItem('userToken');

            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/logout',
                headers:{ 'Authorization': `Bearer ${token}`}
            })
            .then(function(response){
                
                alert(response.data.data);
                
                localStorage.removeItem('userToken');

                that.$router.push({ name: 'login'});
            })
            .catch(function(error){
                alert(error.response);
            })
            
            // localStorage.setItem('userToken', '');

            // this.$router.push({ name: 'login' });
        }
    }

}

</script>


<style>

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

</style>