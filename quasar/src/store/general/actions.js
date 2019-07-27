import Vue from 'vue'
const Upload = ({ commit }, file) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios
      .post(`upload`, file, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        console.log('Upload => res.data', res.data)
        resolve(res.data)
      })
      .catch(err => {
        console.error('Upload', err)
        Vue.prototype.$q.notify('Could not connect to the server')
        reject(err)
      })
  })
}
const Download = ({ commit }, file) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios
      .post(`download`, file)
      .then(res => {
        console.log('Download => res.data', res.data)
        resolve(res.data)
      })
      .catch(err => {
        console.error('Download', err)
        Vue.prototype.$q.notify('Could not connect to the server')
        reject(err)
      })
  })
}
const List = () => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios
      .get('/')
      .then(res => {
        console.log('List => res.data', res.data)
        resolve(res.data)
      })
      .catch(err => {
        console.error('List', err)
        Vue.prototype.$q.notify('Could not connect to the server')
        reject(err)
      })
  })
}

export default {
  Upload,
  Download,
  List
}
