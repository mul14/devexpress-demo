import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

export default {
  _user: null,

  loggedIn() {
    const user = window.localStorage.getItem('user')

    if (user) {
      this._user = JSON.parse(user)
      axios.defaults.headers['authorization'] = 'Bearer 123';
    }

    return this._user;
  },

  async logIn(email, password) {
    try {
      const response = await axios.post('/login', {
        email,
        password,
      })

      this._user = {
        id: response.data.data.id,
        email: response.data.data.email,
        name: response.data.data.name,
        role_id: response.data.data.role_id,
      };

      const user = window.localStorage.setItem('user', JSON.stringify(this._user))
      axios.defaults.headers['authorization'] = 'Bearer 123';

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  },

  async logOut() {
    this._user = null;
    window.localStorage.removeItem('user')
  },

  async getUser() {
    try {
      const user = JSON.parse(window.localStorage.getItem('user'));

      return {
        isOk: true,
        data: {
          ...user,
        }
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  },

  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  },

  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  },

  async createAccount(email, password) {
    try {
      // Send request
      await axios.post('/users', {
        email: '',
        password,
        role_id: '',
      })

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }
};
