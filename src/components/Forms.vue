<template>
  <div class="forms">
    <div class="forms-container">
      <h3 class="forms-heading">{{formHeading}}</h3>
      <div v-show="showLogin" class="forms-input-container fade">
        <form @submit.prevent="logIn">
          <div class="forms-input">
            <span v-if="loginError" class="form-error fade">Wrong email/password</span><br>
            <label>Email</label><br>
            <input type="email" v-model="loginInfo.logEmail">
            <span v-if="!$v.loginInfo.logEmail.required && $v.loginInfo.logEmail.$dirty" class="form-error fade">Email is required!</span>
            <span v-if="!$v.loginInfo.logEmail.email && $v.loginInfo.logEmail.$dirty" class="form-error fade">Invalid email.</span>
          </div>
          <div class="forms-input">
            <label>Password</label><br>
            <input type="password" v-model="loginInfo.logPassword">
            <span v-if="!$v.loginInfo.logPassword.required && $v.loginInfo.logPassword.$dirty" class="form-error fade">Password is required!</span>
          </div>
          <input class="forms-button" type="submit" value="LOGIN">
        </form>
        <p class="forms-text">No account yet? <span @click="toggleForms">REGISTER HERE</span></p>
      </div>
      <div v-show="showRegister" class="forms-input-container fade">
        <form @submit.prevent="register">
          <div class="forms-input">
            <label>Email</label><br>
            <input type="email" v-model="registerData.regEmail">
            <span v-if="isRegistered === false" class="form-error fade">Email already exist!</span>
            <span v-if="!$v.registerData.regEmail.required && $v.registerData.regEmail.$dirty && isRegistered" class="form-error fade">Email is required!</span>
            <span v-if="!$v.registerData.regEmail.email && $v.registerData.regEmail.$dirty && isRegistered" class="form-error fade">Invalid email.</span>
          </div>
          <div class="forms-input">
            <label>Password</label><br>
            <input type="password" v-model="registerData.regPassword">
            <span v-if="!$v.registerData.regPassword.required && $v.registerData.regPassword.$dirty && isRegistered" class="form-error fade">Password is required!</span>
            <span v-if="!$v.registerData.regPassword.minLength && $v.registerData.regPassword.$dirty && isRegistered" class="form-error fade"> {{$v.registerData.regPassword.$params.minLength.min}} characters minimum! </span>
          </div>
          <div class="forms-input">
            <label>Confirm Password</label><br>
            <input :disabled="!registerData.regPassword" type="password" v-model="registerData.repeatPassword">
            <span v-if="!$v.registerData.repeatPassword.sameAsPassword && $v.registerData.repeatPassword.$dirty" class="form-error fade">Password did not match!</span>
          </div>
          <input class="forms-button" type="submit" value="REGISTER">
        </form>
        <p class="forms-text">No account yet? <span @click="toggleForms">LOGIN HERE</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Forms',
  props: {
    hideForm: Function
  },
  data () {
    return {
      formHeading: 'LOGIN',
      showLogin: true,
      loginError: false,
      isRegistered: true,
      showRegister: false,
      loginInfo: {
        logEmail: '',
        logPassword: ''
      },
      registerData: {
        regEmail: '',
        regPassword: '',
        repeatPassword: ''
      }
    }
  },
  validations: {
    loginInfo: {
      logEmail: {
        required,
        email
      },
      logPassword: {
        required
      }
    },
    registerData: {
      regEmail: {
        required,
        email
      },
      regPassword: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('regPassword')
      }
    }
  },
  computed: {
    ...mapGetters(['isLogined'])
  },
  methods: {
    ...mapActions(['loginUser', 'registerUser']),
    logIn () {
      this.$v.loginInfo.$touch()
      if (!this.$v.loginInfo.$invalid) {
        this.loginUser(this.loginInfo)
          .then(res => {
            if (res.length > 0) {
              this.hideForm()
              this.clearFields()
            } else {
              this.loginError = true
            }
          })
      }
    },
    register () {
      const { regEmail, regPassword } = this.registerData
      const payload = {
        regEmail,
        regPassword
      }
      this.$v.registerData.$touch()
      if (this.$v.registerData.$invalid) {
        console.log('Something wrong')
      } else {
        this.registerUser(payload)
          .then((res) => {
            if (res === true) {
              this.toggleForms()
              this.isRegistered = true
            } else {
              this.isRegistered = false
            }
          })
        this.registerData = {
          regEmail: '',
          regPassword: '',
          repeatPassword: ''
        }
      }
    },
    toggleForms () {
      if (this.showLogin) {
        this.showLogin = false
        this.formHeading = 'REGISTER'
        this.showRegister = true
        this.clearFields()
      } else {
        this.showLogin = true
        this.formHeading = 'LOGIN'
        this.showRegister = false
        this.clearFields()
      }
    },
    clearFields () {
      this.loginInfo = {
        logEmail: '',
        logPassword: ''
      }
      this.registerData = {
        regEmail: '',
        regPassword: '',
        repeatPassword: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.forms {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  text-align: left;
}

.forms-container {
  width: 460px;
}

.forms-heading {
  font-size: 30px;
  color: black;
  letter-spacing: 0.1em;
}

.forms-input-container {
  margin-top: 25px;
}

.forms-input {
  font-size: 18px;
  letter-spacing: 0.1em;
  color: black;
  margin-top: 21px;

  input {
    width: 100%;
    height: 60px;
    font-size: 18px;
    color: black;
    padding: 10px;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }
}

.forms-button {
  width: 100%;
  height: 70px;
  background-color: black;
  font-size: 20px;
  letter-spacing: 0.1em;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 20px;
}

.forms-text {
  font-size: 18px;
  color: black;
  letter-spacing: 0.1em;
  text-align: center;
  margin-top: 36px;

  span {
    font-weight: bold;
    cursor: pointer;
  }
}

.form-error {
  color: red;
  font-size: 14px;
}

</style>
