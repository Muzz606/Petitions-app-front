<template>
  <body>
  <!--    top of page-->
  <div align="center">
    <div>
      <h1>PETITIONS SIGN UP</h1>
    </div>
    <b-button variant="outline-primary" id="login" href="/login">Login</b-button>
    <div>
      <h5><a href="/">Home</a></h5>
    </div>
    <hr>
  </div>
  <!--    form data-->
  <div id="formData">
    <form>
      <div class="form-group mx-sm-3 mb-2">
        <label for="nameInput">Name:</label>
        <input type="text" v-model="inputName" class="form-control" id="nameInput" placeholder="Enter Name">
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <label for="emailInput">Email address:</label>
        <input type="email" v-model="inputEmail" class="form-control" id="emailInput" placeholder="Enter Email">
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <label for="passwordInput">Password:</label>
        <input type="password" v-model="inputPassword" class="form-control" id="passwordInput" placeholder="Password">
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <label for="cityInput">City:</label>
        <input type="text" v-model="inputCity" class="form-control" id="cityInput" placeholder="Enter City Name">
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <label for="countryInput">Country:</label>
        <input type="text" v-model="inputCountry" class="form-control" id="countryInput" placeholder="Enter Country Name">
      </div>
      <b-button id="signButton" type="button" v-on:click="signUp" value="add" variant="primary">Sign Up</b-button>
    </form>
  </div>
  </body>
</template>

<script>
  import Vue from "vue";

  export default {
    data (){
      return {
        error: "",
        errorFlag: false,
        cookie: null,
        authenticated: false,
        inputName: "",
        inputEmail: "",
        inputPassword: "",
        inputCity: "",
        inputCountry: ""
      }
    },
    mounted: function () {
      this.Refresh();
    },
    methods: {
      signUp: function () {
        const data = {
          name: this.inputName.toString(),
          email: this.inputEmail.toString(),
          password: this.inputPassword.toString()
          //city: 'NULL',
          //country: 'NULL'
        }
        if (this.inputCity !== "") {
          data.city = this.inputCity.toString();
        }
        if (this.inputCountry !== "") {
          data.country = this.inputCountry.toString();
        }
        console.log(data);
        this.$http.post('http://localhost:4941/api/v1/users/register', data)
          .then(function () {
            this.$router.push('/login');
          }, function (err) {
            alert(err);
          })

      },
      Refresh: function () {
        this.cookie = Vue.$cookies.get("CookieToken");
        this.authenticated = this.cookie !== null;
        if (this.authenticated) {
          //be aware: $router.push runs quicker than window.location.href but wont update cookies
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style scoped>

  #formData {
    padding: 10px;
    margin-left: 100px;
    margin-right: 100px;
    border: solid darkgray;
  }
  #login {
    position: absolute;
    top: 7px;
    right: 5px;
  }
  #signButton {
    margin-left: 16px;
  }
</style>
