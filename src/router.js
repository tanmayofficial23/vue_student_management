import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from './components/LoginPage.vue';
import RegisterForm from './components/RegistrationForm.vue';
import EmailVerify from './components/EmailVerify.vue';
import HomePage from './components/HomePage.vue';
import InsertPage from './components/InsertPage.vue';
import EditPage from './components/EditPage.vue';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword.vue';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },

        {
            path: '/register',
            name: 'register',
            component: RegisterForm
        },

        {
            path: '/emailverify',
            name: 'emailverify',
            component: EmailVerify
        },

        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },

        {
            path: '/home',
            name: 'home',
            component: HomePage
        },

        {
            path: '/insert',
            name: 'insert',
            component: InsertPage
        },

        {
            path: '/edit',
            name: 'edit',
            component: EditPage
        },

        {
            path: '/forgotpassword',
            name: 'forgotpassword',
            component: ForgotPassword
        },

        {
            path: '/reset',
            name: 'reset',
            component: ResetPassword
        }

        
        
    ]
})