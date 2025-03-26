export default {
  endpoint: null,

  setEndpoint(endpoint) {
    this.endpoint = endpoint
  },

  getEndpoint() {
    return this.endpoint
  },

  async pingServer(endpoint = this.endpoint) {
    try {
      const response = await fetch(endpoint + '/ping')
      return response.status === 200
    }
    catch(e) {
      return false
    }
  },

  async fetchData() {
    try {
      let response = await fetch(this.endpoint + '/feed/latest')
      let responseJson = await response.json()
      return responseJson
    } catch (e) {
      console.error('error fetching data from api', e)
    }
  },

  async fetchComingBuses(destination) {
    let response = await fetch(this.endpoint + '/coming-buses/' + destination.id)
    // let response = await fetch(this.endpoint + '/coming-buses/' + destination.id + '/static')
    let responseJson = await response.json()
    // return responseJson
    return responseJson.results
  },

  setData(data) {
    this.data = data
  },

  getData() {
    return this.data
  }
}
