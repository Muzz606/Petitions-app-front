import App from './App.vue';
import Home from './Home.vue';
import Login from './Login.vue';
import Register from "./Register.vue";

import Vue from 'vue';
import VueResource from 'vue-resource';
//import axios from 'axios';
//import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
