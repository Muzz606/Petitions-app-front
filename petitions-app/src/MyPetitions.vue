<template>
  <body>
    <div align="center">
      <div>
        <h1>PETITIONS</h1>
      </div>
      <div>
        <h5><a href="/">Home</a> | <u>My Petitions</u> | <a href="/profile">Profile</a> </h5>
        <b-button variant="outline-danger" class="btn-sm" id="logOut" v-on:click="logOut">Log Out</b-button>
      </div>
      <hr>
    </div>
    <div id="thisPetition">
      <b-button id="next" type="button" v-on:click="nextPetition" value="add" variant="primary"> > </b-button>
      <b-button id="prev" type="button" v-on:click="previousPetition" value="subtract" variant="primary"> < </b-button>
      <div v-if="edit">
<!--        create a petition-->
        <div v-if="emptyPetition">
          <form>
            <div class="form-group mx-sm-3 mb-2">
              <label for="editEmptyTitle">Title:</label>
              <input v-model="petitionForm.title" type="text" class="form-control" placeholder="Enter a Title..." id="editEmptyTitle">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="editEmptyDescription">Description:</label>
              <textarea v-model="petitionForm.description" class="form-control" id="editEmptyDescription" placeholder="Please describe your petition..."></textarea>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="emptyCategory">Category:</label>
              <select id="emptyCategory" v-model="petitionForm.categoryId">
                <option value="1">Animals</option>
                <option value="2">Environment</option>
                <option value="3">Entertainment</option>
                <option value="4">Human Rights</option>
                <option value="5">Immigration</option>
                <option value="6">Justice</option>
                <option value="7">Other</option>
              </select>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="editEmptyImage">Petition Image:</label>
              <input readonly type="text" class="form-control" placeholder="Upload a image..." id="editEmptyImage">
            </div>
            <div id="dateTimePicker" class="form-group mx-sm-3 mb-2">
              <label for="editEmptyDate">Closing date:</label>
              <input v-model="petitionForm.closingDate" data-format="yyyy/MM/dd hh:mm:ss" type="text" class="form-control" placeholder="YYYY/MM/DD HH:MM:SS" id="editEmptyDate">
            </div>
            <div align="center">
              <b-button id="Create" type="button" v-on:click="createPetition" value="submit" variant="outline-primary">Create</b-button>
            </div>
          </form>
        </div>
        <div v-else>
          <form>
            <div>
              <img width="120" height="100" onerror="if (this.src !== '/photos/noImage.png') this.src = '/photos/noImage.png'" v-bind:src="currentPetition[0].source">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="Title">Title:</label>
              <input type="text" class="form-control" id="Title" v-bind:value="currentPetition[0].data.title">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="Description">Description:</label>
              <textarea type="text" class="form-control" id="Description" v-bind:value="currentPetition[0].data.description"></textarea>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="Author">Author:</label>
              <p type="text" readonly class="form-control" id="Author"> <span>{{currentPetition[0].data.authorName}}: </span><a href="/profile"><b>Details</b></a></p>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="Signatures">Signatures:</label>
              <!--            wont be null as petitions created will add a signature-->
              <input type="text" readonly class="form-control" id="Signatures" v-bind:value="currentPetition[0].data.signatureCount">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="Signers">Signers:</label>
              <input type="text" readonly class="form-control" id="Signers" v-bind:value="'add modal, profimg,name,city,country'">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="Category">Category:</label>
              <input type="text" class="form-control" id="Category" v-bind:value="currentPetition[0].data.category">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="CreatedDate">Date Created:</label>
              <input type="text" readonly class="form-control" id="CreatedDate" v-bind:value="currentPetition[0].data.createdDate">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="ClosingDate">Closing Date:</label>
              <input placeholder="No Closing Date" type="text" class="form-control" id="ClosingDate" v-bind:value="currentPetition[0].data.closingDate">
            </div>
            <div align="center">
              <b-button id="Save" type="button" v-on:click="" value="submit" variant="outline-primary">Save</b-button>
              <b-button id="Cancel" type="button" v-on:click="edit = false" value="close" variant="outline-secondary">Cancel</b-button>
            </div>
          </form>
        </div>
      </div>
<!--      if not editing-->
      <div v-if="!edit">
        <form>
          <div align="center">
            <img width="120" height="100" onerror="if (this.src !== '/photos/noImage.png') this.src = '/photos/noImage.png'" v-bind:src="currentPetition[0].source">
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticTitle">Title:</label>
            <input type="text" readonly class="form-control" id="staticTitle" v-bind:value="currentPetition[0].data.title">
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticDescription">Description:</label>
            <textarea type="text" readonly class="form-control" id="staticDescription" v-bind:value="currentPetition[0].data.description"></textarea>
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticAuthor">Author:</label>
            <p type="text" readonly class="form-control" id="staticAuthor"> <span>{{currentPetition[0].data.authorName}}: </span><a href="/profile"><b>Details</b></a></p>
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticSignatures">Signatures:</label>
<!--            wont be null as petitions created will add a signature-->
            <input type="text" readonly class="form-control" id="staticSignatures" v-bind:value="currentPetition[0].data.signatureCount">
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticSigners">Signers:</label>
            <input type="text" readonly class="form-control" id="staticSigners" v-bind:value="'add modal, profimg,name,city,country'">
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticCategory">Category:</label>
            <input type="text" readonly class="form-control" id="staticCategory" v-bind:value="currentPetition[0].data.category">
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticCreatedDate">Date Created:</label>
            <input type="text" readonly class="form-control" id="staticCreatedDate" v-bind:value="currentPetition[0].data.createdDate">
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="staticClosingDate">Closing Date:</label>
            <input placeholder="No Closing Date" type="text" readonly class="form-control" id="staticClosingDate" v-bind:value="currentPetition[0].data.closingDate">
          </div>
          <div align="center">
            <b-button id="Edit" type="button" v-on:click="edit = true" value="add" variant="primary">Edit Petition</b-button>
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
        petitions: [],
        cookie: null,
        id: null,
        userPetitions: [],
        edit: false,
        emptyPetition: false,
        petitionIndex: 0,
        currentPetition: [],
        petitionForm: {
          title: "",
          description: "",
          categoryId: "",
          date: ""
        }
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
                  let temp = {
                    data: response.data,
                    source: "http://localhost:4941/api/v1/petitions/" + response.data.petitionId.toString() + "/photo"

                }
                  this.userPetitions.push(temp);
                  if (i === 0) {
                    this.currentPetition.push(temp);
                  }
                })
            }
          })
      },
      nextPetition: function () {
        //set to -1 if create petition maybe have create button to set to -1
        this.petitionIndex++;
        if (this.userPetitions[this.petitionIndex] === undefined) {
          this.petitionIndex = -1;
          this.emptyPetition = true;
          this.edit = true;
        } else {
          this.edit = false;
          this.emptyPetition = false;
          this.currentPetition = [this.userPetitions[this.petitionIndex]];
        }
      },
      previousPetition: function () {
        this.petitionIndex--;
        if (this.userPetitions[this.petitionIndex] === undefined) {
          if (this.petitionIndex === -2) {
            this.petitionIndex = this.userPetitions.length -1;
            this.currentPetition = [this.userPetitions[this.petitionIndex]];
            this.emptyPetition = false;
            this.edit = false;
          } else {
            this.emptyPetition = true;
            this.edit = true;
          }
        } else {
          this.edit = false;
          this.emptyPetition = false;
          this.currentPetition = [this.userPetitions[this.petitionIndex]];
        }
      },
      createPetition: function () {
        const config = {
          headers: {'X-Authorization': this.cookie.toString()}
        }
        this.$http.post('http://localhost:4941/api/v1/petitions', this.petitionForm, config)
          .then(function (response) {
            if (response.data.petitionId === undefined) {
              alert("Please Fill all fields");
            } else {
              window.location.href = "/myPetitions";
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
  #thisPetition {
    padding: 10px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 15px;
    border: solid darkgray;
  }
  #next {
    position: absolute;
    right: 30px;
    top: 300px;
  }
  #prev {
    position: absolute;
    left: 30px;
    top: 300px;
  }
</style>
