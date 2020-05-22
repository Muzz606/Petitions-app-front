<!--
use this for petition details
<b-button id="details" v-b-modal="'detailsModal'">Details</b-button>
         modal
<b-modal id="detailsModal" hide-footer>
  <template v-slot:modal-title>
    this is the title
  </template>
  <div class="d-block text-center">
    <form action="">
      <fieldset>
        <legend>Register:</legend>
      </fieldset>
    </form>

  </div>
  <b-button block @click="$bvModal.hide('myModal')">Close Me</b-button>
</b-modal> -->


<template>
  <body>
<!--      Model for petition details-->
    <b-modal id="detailsModal" hide-footer>
      <template v-slot:modal-title>
<!--        add for the details of petition-->
        {{current}}
      </template>
      <div class="d-block text-center">
        <form action="">
          <fieldset>
            <legend>Register:</legend>
          </fieldset>
        </form>
      </div>
      <b-button block @click="$bvModal.hide('detailsModal')">Close Me</b-button>
    </b-modal>

  <!--    Header of home page-->
    <div align="center">
      <div id="header">
        <h1>PETITIONS</h1>
<!--        could have profile img... use #profile-->
        <div v-if="!authenticated">
          <b-button variant="outline-primary" id="login" href="/login">Login</b-button>
          <b-button variant="outline-primary" id="signUp" href="/register">Sign Up</b-button>
        </div>
      </div>
      <div v-if="authenticated">
        <h5><u>Home</u> | <a href="">My Petitions</a> | <a href="">Edit Profile</a> </h5>
<!--        TODO: implement logout functionality:  DONE -->
        <b-button variant="outline-primary" id="logOut" v-on:click="logOut">Log Out</b-button>
      </div>
      <div v-else>
        <h5><u>Home</u></h5>
      </div>
      <hr>
    </div>
<!--    Main part of page-->
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Petition Id</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Author</th>
            <th scope="col"># Signatures</th>
          </tr>
        </thead>
        <tbody v-for="petition in petitions">
          <tr>
            <th scope="row">{{petition.rowNumber}}</th>
            <td>{{petition.id}}</td>
            <td>{{petition.title}}</td>
            <td>{{petition.category}}</td>
            <td>{{petition.author}}</td>
            <td>{{petition.signs}}</td>
            <td><b-button id="details" v-on:click="current = petition.rowNumber" v-b-modal="'detailsModal'">Details</b-button></td>
          </tr>
        </tbody>
      </table>
    <div>

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
        authenticated: false,
        petitions: [],
        cookie: null,
        current: null
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
            window.location.href = '/';
          })
      },
      Refresh: function () {
        this.cookie = Vue.$cookies.get("CookieToken");
        this.authenticated = this.cookie !== null;
      },
      getPetitions: function () {
        this.$http.get('http://localhost:4941/api/v1/petitions')
          .then(function (response) {
            for (let i = 1; i < response.data.length; i++) {
              let temp = {
                rowNumber: i,
                id: response.data[i].petitionId,
                title: response.data[i].title,
                category: response.data[i].category,
                author: response.data[i].authorName,
                signs: response.data[i].signatureCount,
                modalName: "detailsModal" + i.toString()
              }
              this.petitions.push(temp);
            }
          })
      }
    }
  }
</script>

<style scoped>
  #profile {
    position: absolute;
    top: 7px;
    right: 10px;
  }
  #login {
    position: absolute;
    top: 7px;
    right: 90px;
  }
  #signUp {
    position: absolute;
    top: 7px;
    right: 5px;
  }
  #logOut {
    position: absolute;
    top: 7px;
    right: 5px;
  }
</style>
