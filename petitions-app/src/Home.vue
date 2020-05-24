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
        {{currentDetails}}
      </template>
      <div class="d-block text-center">
<!-- TODO: mayb do for petition in petitions. run quicker as only gets displayed petitions. but will be always updating. need to add get for petition id so i can have descr etc.-->
      </div>
      <b-button variant="btn btn-danger" @click="$bvModal.hide('detailsModal')">Close</b-button>
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
        <h5><u>Home</u> | <a href="/myPetitions">My Petitions</a> | <a href="">Edit Profile</a> </h5>
<!--        TODO: implement logout functionality:  DONE -->
        <b-button variant="outline-danger" class="btn-sm" id="logOut" v-on:click="logOut">Log Out</b-button>
      </div>
      <div v-else>
        <h5><u>Home</u></h5>
      </div>
      <hr>
    </div>
<!--    Main part of page-->
    <div id="tableDiv" align="center">
      <table class="table table-hover table-bordered" id="mainTable">
        <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Category</th>
          <th scope="col">Author</th>
          <th>Hero image here</th>
          <th scope="col"># Signatures</th>
        </tr>
        </thead>
        <tbody v-for="petition in petitions">
        <tr>
          <th scope="row">{{petition.rowNumber}}</th>
          <td>{{petition.title}}</td>
          <td>{{petition.category}}</td>
          <td>{{petition.author}} need to add profile details</td>
          <td>hero image here</td>
          <td>{{petition.signs}}</td>
          <td v-on:click="getPetitionDetails(currentRow)">
            <b-button id="details" variant="outline-secondary" v-on:click="currentRow = petition.rowNumber - 1" v-b-modal="'detailsModal'">Details</b-button>
          </td>
        </tr>
        </tbody>
      </table>
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
        currentDetails: {},
        currentRow: 0,
        cookie: null
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
        this.authenticated = this.cookie !== null;
      },
      getPetitions: function () {
        this.$http.get('http://localhost:4941/api/v1/petitions')
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              let temp = {
                rowNumber: i + 1,
                id: response.data[i].petitionId,
                title: response.data[i].title,
                category: response.data[i].category,
                author: response.data[i].authorName,
                signs: response.data[i].signatureCount
              }
              this.petitions.push(temp);
            }
          })
      },
      // TODO: need to add get for author prof,name,city,country
      getPetitionDetails: function (petitionRow) {
        let petitionId = this.petitions[petitionRow].id;
        console.log(petitionId);
        this.$http.get('http://localhost:4941/api/v1/petitions/' + petitionId)
          .then(function (response) {
              let temp = {
                title: response.data.title,
                category: response.data.category,
                author: response.data.authorName,
                signs: response.data.signatureCount,
                description: response.data.description,
                authorCity: response.data.authorCity,
                authorCountry: response.data.authorCountry,
                createdDate: response.data.createdDate,
                closingDate: response.data.closingDate
              }
              this.currentDetails = temp;
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
  #tableDiv {
    margin: 10px;
  }
</style>
