<template>
  <body>
<!--    top of page-->
    <div align="center">
      <div>
        <h1>PETITIONS LOG IN</h1>
      </div>
      <b-button variant="outline-primary" id="signUp" href="/register">Sign Up</b-button>
      <div>
        <h5><a href="/">Home</a></h5>
      </div>
      <hr>
    </div>
<!--    form data-->
    <div id="formData">
      <form>
        <div class="form-group mx-sm-3 mb-2">
          <label for="emailInput">Email address:</label>
          <input type="email" v-model="inputEmail" class="form-control" id="emailInput" placeholder="Enter Email">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="passwordInput">Password:</label>
          <input type="password" v-model="inputPassword" class="form-control" id="passwordInput" placeholder="Password">
        </div>
        <b-button id="logIn" type="button" v-on:click="login" value="add" variant="primary">Log In</b-button>
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
      inputEmail: "",
      inputPassword: ""
    }
  },
  mounted: function () {
    this.checkToken()
  },
  methods: {
    login: function () {
      const data = {
        email: this.inputEmail.toString(),
        password: this.inputPassword.toString()
      }
      this.$http.post('http://localhost:4941/api/v1/users/login', data)
        .then(function (response) {
          //console.log(response.data.token);
          if(response.data.token !== undefined) {
            Vue.$cookies.set("CookieToken", [response.data.token.toString()], "2h");
            Vue.$cookies.set("CookieId", response.data.userId, "2h");
            //this.$cookies.set("CookiePassword", this.inputPassword);
            window.location.href = '/';
            //console.log(Vue.$cookies.get("CookieToken"));
          } else {
            alert("Didn't accept preflight request: server declined");
          }

        }, function (err) {
          alert(err);
        })
    },
    checkToken: function () {
      if (this.$cookies.get("CookieToken") !== null) {
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
  #signUp {
    position: absolute;
    top: 7px;
    right: 5px;
  }
  #logIn {
    margin-left: 16px;
  }
</style>
