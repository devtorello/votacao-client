export default {
    data: {
      id: null,
      firstName: null,
      lastName: null,
      CPF: null,
      level: null
    },

    load(user) {
      for (let key in user) {
        // if (this.data.hasOwnProperty(key) && key != 'load' && key != 'clear')
          this.data[key] = user[key]
      }
    },
  
    clear() {
      this.data.id = null
      this.data.firstName = null
      this.data.lastName = null
      this.data.CPF = null
      this.data.level = null
    }
}
  