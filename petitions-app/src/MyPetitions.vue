<template>
  <body>
    <div align="center">
      <div>
        <h1>PETITIONS</h1>
      </div>
      <div>
        <h5><a href="/">Home</a> | <u>My Petitions</u> | <a href="/profile">Edit Profile</a> </h5>
        <b-button variant="outline-primary" id="logOut" v-on:click="logOut">Log Out</b-button>
      </div>
      <hr>
    </div>
    {{userPetitions}}

  </body>
</template>

<script>
  import Vue from "vue";

  export default {
    data (){
      return {
        error: "",
        errorFlag: false,
        authenticated: false,
        petitions: [],
        cookie: null,
        id: null,
        userPetitions: []
      }
    },
    mounted: function () {
      this.Refresh();
      this.getPetitions();
    },
    methods: {
      logOut: function () {
        const config = {
          headers: {'X-Authorization': this.cookie.toString()}
        }
        this.$http.post('http://localhost:4941/api/v1/users/logout',"", config)
          .then(function () {
            Vue.$cookies.remove("CookieToken");
            Vue.$cookies.remove("CookieId");
            window.location.href = '/';
          })
      },
      Refresh: function () {
        this.cookie = Vue.$cookies.get("CookieToken");
        this.id = Vue.$cookies.get("CookieId");
        this.authenticated = this.cookie !== null;
        if (!this.authenticated) {
          this.$router.push("/");
        }
      },
      getPetitions: function () {
        this.$http.get('http://localhost:4941/api/v1/petitions?authorId=' + this.id)
          .then(function (response) {
            this.petitions = response.data;
          })
          .then(function () {
            for (let i = 0; i < this.petitions.length; i++) {
              this.$http.get('http://localhost:4941/api/v1/petitions/' + this.petitions[i].petitionId)
                .then(function (response) {
                  this.userPetitions.push(response.data);
                })
            }
          })
      }
    }
  }
</script>

<style scoped>
  #logOut {
    position: absolute;
    top: 7px;
    right: 5px;
  }
</style>
