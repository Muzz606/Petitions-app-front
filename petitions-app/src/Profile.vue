<template>
  <body>
  <!--    top of page-->
  <div align="center">
    <div>
      <h1>PETITIONS</h1>
    </div>
    <div>
      <h5><a href="/">Home</a> | <a href="/myPetitions">My Petitions</a> | <u>Profile</u> </h5>
      <b-button variant="outline-danger" class="btn-sm" id="logOut" v-on:click="logOut">Log Out</b-button>
    </div>
    <hr>
  </div>
  <!--    form data-->
  <div id="formData">
    <div v-if="edit">
      <form>
        <div>
          <img width="120" height="100" onerror="if (this.src !== '/photos/noImage.png') this.src = '/photos/noImage.png'" v-bind:src="user.source">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputName">Name:</label>
          <input type="text" class="form-control" v-model="editUser.name" id="inputName" v-bind:placeholder="user.name">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="emailInput">Email address:</label>
          <input type="email" class="form-control" v-model="editUser.email" id="emailInput" v-bind:placeholder="user.email">
        </div>

        <div>
          password handling
        </div>


        <div class="form-group mx-sm-3 mb-2">
          <label for="inputCity">City:</label>
          <input type="text" class="form-control" v-model="editUser.city" id="inputCity" v-bind:placeholder="user.city">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputCountry">Country:</label>
          <input type="text" class="form-control" v-model="editUser.country" id="inputCountry" v-bind:placeholder="user.country">
        </div>
        <hr>
        <div align="center" class="form-group mx-sm-3 mb-2">
          <b-button id="save" block type="button" v-on:click="" value="submit" variant="primary">Save Changes</b-button>
          <b-button id="cancel" block type="button" v-on:click="edit = false" value="add" variant="danger">Cancel</b-button>
        </div>
      </form>

    </div>
    <div v-else>
      <form>
        <div class="form-group mx-sm-3 mb-2">
          <img width="120" height="100" onerror="if (this.src !== '/photos/noImage.png') this.src = '/photos/noImage.png'" v-bind:src="user.source">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="staticName">Name:</label>
          <input type="text" readonly class="form-control" v-model="user.name" id="staticName">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="staticEmailInput">Email address:</label>
          <input type="email" readonly class="form-control" v-model="user.email" id="staticEmailInput">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="staticCity">City:</label>
          <input type="text" readonly class="form-control" v-model="user.city" id="staticCity">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="staticCountry">Country:</label>
          <input type="text" readonly class="form-control" v-model="user.country" id="staticCountry">
        </div>
        <hr>
        <div align="center" class="form-group mx-sm-3 mb-2">
          <b-button id="edit" block type="button" v-on:click="edit = true" value="add" variant="primary">Edit</b-button>
        </div>
      </form>
    </div>
  </div>
  </body>
</template>

<script>
  import Vue from "vue";

  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        authenticated: false,
        user: {},
        editUser: {
          name: null,
          email: null,
          password: null,
          currentPassword: null,
          city: null,
          country: null
        },
        cookie: null,
        edit: false
      }
    },
    mounted: function () {
      this.Refresh();
    },
    methods: {
      logOut: function () {
        const config = {
          headers: {'X-Authorization': this.cookie.toString()}
        }
        this.$http.post('http://localhost:4941/api/v1/users/logout', "", config)
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
        } else {
          const config = {
            headers: {'X-Authorization': this.cookie.toString()}
          }
          this.$http.get('http://localhost:4941/api/v1/users/' + this.id, config)
            .then(function (response) {
              let user = {
                name: response.data.name,
                email: response.data.email,
                city: response.data.city,
                country: response.data.country,
                source: "http://localhost:4941/api/v1/petitions/" + Vue.$cookies.get("CookieId") + "/photo"
              }
              this.user = user;
            })
        }
      },

    }
  }
</script>

<style scoped>
  #logOut {
    position: absolute;
    top: 7px;
    right: 5px;
  }
  #formData {
    padding: 10px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 15px;
    border: solid darkgray;
  }
</style>
