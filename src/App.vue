<template>

  <center>
  
    <div id="app">

      <router-view />

    </div>

  </center>

</template>

<script>

import LoginPage from './components/LoginPage.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import HomePage from './components/HomePage.vue';
import InsertPage from './components/InsertPage.vue';
import EditPage from './components/EditPage.vue';
import ResetPassword from './components/ResetPassword.vue';

import axios from 'axios'

  export default {
      
    name: 'app',

    components: { 
      LoginPage,
      RegistrationForm,
      HomePage,
      InsertPage,
      EditPage,
      ResetPassword
    }
  }

</script>

<style>
</style>
