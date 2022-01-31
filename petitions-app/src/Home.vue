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
    <b-modal align="center" @change="showSignatures = false" id="detailsModal" hide-footer>
      <template v-slot:modal-title>
        <h1 align="center"><u>{{currentDetails.title}}</u></h1>
      </template>
      <div class="d-block text-center">
        <div>
          <img width="120" height="100" onerror="if (this.src !== '/photos/noImage.png') this.src = '/photos/noImage.png'" v-bind:src="currentDetails.source">
        </div>
        <hr>
        <div>
          <label for="staticDescription"><h5>Description:</h5></label>
          <textarea type="text" style="height: 100px" readonly class="form-control" id="staticDescription" v-bind:value="currentDetails.description"></textarea>
        </div>
        <hr>
        <div>
          <h5>Author:</h5>
          {{currentDetails.author}} add author details.
        </div>
        <hr>
        <div>
          <h5>Signatures:</h5>
          {{currentDetails.signs}}
        </div>
        <hr>
        <div>
          <h5>Category:</h5>
          {{currentDetails.category}}
        </div>
        <hr>
        <div>
          <h5>Created Date:</h5>
          {{currentDetails.createdDate}}
        </div>
        <hr>
        <div>
          <h5>Closing Date:</h5>
          {{currentDetails.closingDate}}
        </div>
        <hr>
        <div>
          <h5>Signatories <span v-if="showSignatures === false">
            <b-button variant="info" class="btn-sm" v-on:click="showSignatures = !showSignatures">▼</b-button>
            </span>
            <span v-else>
              <b-button variant="info" class="btn-sm" v-on:click="showSignatures = !showSignatures">▲</b-button>
            </span>
          </h5>
          <div v-if="showSignatures" id="signatureDetails" v-for="signature in signersDetails.signatureDetails">
            <div id="individualSignature">
              <div id="userImage">
                <img width="120" height="100" onerror="if (this.src !== '/photos/noImage.png') this.src = '/photos/noImage.png'" v-bind:src="signature.source">
              </div>
              <p><b>Name: </b>{{signature.signer.name}}</p>
              <div v-if="signature.city !== null">
                <p id="country"><b>Country: </b>{{signature.signer.country}}</p>
              </div>
              <div v-if="signature.country !== null">
                <p id="city"><b>City: </b>{{signature.signer.country}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <b-button variant="btn btn-danger" block @click="$bvModal.hide('detailsModal')">Close</b-button>
      <br>
      <div v-if="authenticated">
        <div v-if="!signersDetails.signed" align="center">
          <b-button block variant="primary" v-on:click="signPetition">Sign</b-button>
        </div>
        <div v-else align="center">
          <b-button block variant="warning" v-on:click="removeSignature">Remove Signature</b-button>
        </div>
      </div>
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
        <h5><u>Home</u> | <a href="/myPetitions">My Petitions</a> | <a href="/profile">Profile</a> </h5>
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
        <tr align="center">
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Category</th>
          <th scope="col">Author</th>
          <th>Hero</th>
          <th scope="col">Signatures</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody v-for="petition in petitions">
        <tr v-on:mouseover="currentRow = petition.rowNumber - 1">
          <th scope="row">{{petition.rowNumber}}</th>
          <td>{{petition.title}}</td>
          <td>{{petition.category}}</td>
          <td>{{petition.author}}</td>
          <td v-bind:id="petition.id"><img width="120" height="100" onerror="if (this.src !== '/photos/noImage.png') this.src = '/photos/noImage.png'" v-bind:src="petition.source"></td>
          <td>{{petition.signs}}</td>
          <td v-on:mouseover="getPetitionDetails(currentRow)">
            <!--<div v-if="authenticated">
              <div v-if="!signersDetails[petition.id - 1].signed" align="center">
                <b-button variant="outline-secondary" v-b-modal="'detailsModal'">Details</b-button>
                <hr>
                <b-button variant="outline-primary" v-on:click="signPetition">Sign</b-button>
              </div>
              <div v-else align="center">
                <b-button variant="outline-secondary" v-b-modal="'detailsModal'">Details</b-button>
                <hr>
                <b-button variant="outline-warning" v-on:click="">Remove Signature</b-button>
              </div>
            </div> !!!MOVED TO MODAL BECAUSE OF RENDERING ERRORS   -->
            <div v-on:click="currentRow = petition.rowNumber - 1">
              <b-button id="details" v-on:click="getSignatory(petitions[currentRow].id)" variant="outline-secondary"  v-b-modal="'detailsModal'">Details</b-button>
            </div>
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
        //ordered by id desc
        currentRow: 0,
        cookie: null,
        signersDetails: {},
        allSigners: [],
        showSignatures: false,
        image: null,
        idIndex: 0,
        userImageSources: []
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
        //Use when loged out but cookie is active
        //Vue.$cookies.remove("CookieToken");
       // Vue.$cookies.remove("CookieId");
        //Vue.$cookies.remove("CookieEmail");
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
                signs: response.data[i].signatureCount,
                source: "http://localhost:4941/api/v1/petitions/" + response.data[i].petitionId.toString() + "/photo"
              }
              this.petitions.push(temp);
            }
          })
      },
      // TODO: need to add get for author prof,name,city,country
      getPetitionDetails: function (petitionRow) {
        let petitionId = this.petitions[petitionRow].id;
        this.$http.get('http://localhost:4941/api/v1/petitions/' + petitionId)
          .then(function (response) {
              let temp = {
                id: petitionId,
                title: response.data.title,
                category: response.data.category,
                author: response.data.authorName,
                signs: response.data.signatureCount,
                description: response.data.description,
                authorCity: response.data.authorCity,
                authorCountry: response.data.authorCountry,
                createdDate: response.data.createdDate,
                closingDate: response.data.closingDate,
                source: "http://localhost:4941/api/v1/petitions/" + petitionId + "/photo"
              }
              this.currentDetails = temp;
          })
      },
      getSignatory: function (petitionId) {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + petitionId + '/signatures')
          .then(function (response) {
            let details = [];
            for (let i = 0; i < response.data.length; i++) {
              let temp = {
                signer: response.data[i],
                source: "http://localhost:4941/api/v1/users/" + response.data[i].signatoryId.toString() + "/photo"
              }
              details.push(temp);
            }
            let final = {
              signatureDetails: details,
              signed: this.checkIfSigned(response.data)
            }
            this.signersDetails = final;

          })
      },
      checkIfSigned: function (signers) {
        for (let i = 0; i < signers.length; i++) {
          let signerId = signers[i].signatoryId;
          if (Vue.$cookies.get("CookieId") === null) {
            return false;
          }
          if (signerId.toString() === Vue.$cookies.get("CookieId").toString()) {
            return true;
          }
        }
        return false;
      },
      signPetition: function () {
        const id = this.currentDetails.id;
        const config = {
          headers: {'X-Authorization': Vue.$cookies.get("CookieToken")}
        }
        this.$http.post("http://localhost:4941/api/v1/petitions/" + id + "/signatures", "", config)
          .then(function (response) {
            //TODO: add handling for closed petitions and already signed
            this.$bvModal.hide('detailsModal');
            alert("Added Signature");
          })
      },
      removeSignature: function () {
        const id = this.currentDetails.id;
        const config = {
          headers: {'X-Authorization': Vue.$cookies.get("CookieToken")}
        }
        this.$http.delete("http://localhost:4941/api/v1/petitions/" + id + "/signatures", config)
          .then(function (response) {
            //TODO: add handling for closed petitions and already signed
            this.$bvModal.hide('detailsModal');
            alert("Removed Signature");
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
    padding: 5px;
    margin: 10px;
  }
  #mainTable {
    border: solid lightgray;
  }
  #signatureDetails {
    border: solid lightcyan;
  }
  #individualSignature {
    border: solid lightcyan;
  }
  #userImage {
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
