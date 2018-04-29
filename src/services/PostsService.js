import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  sendEmail (params) {
    return Api().post('send_email', params)
  }
}
