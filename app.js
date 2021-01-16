const axios = require('axios')
require('dotenv').config()

const instance = axios.create({
  baseURL: `${process.env.ROCKETCHAT_URL}/api/v1`,
})

instance
  .post('/login', {
    user: process.env.ROCKETCHAT_USER,
    password: process.env.ROCKETCHAT_PASSWORD,
  })
  .then((res) => {
    Object.assign(instance.defaults, {
      headers: {
        'X-User-Id': res.data.data.userId,
        'X-Auth-Token': res.data.data.authToken,
      },
    })
    instance
      .post('/chat.postMessage', {
        channel: process.env.ROCKETCHAT_TO_WHOM,
        text: 'Rocketchat backup completed successfully!',
        alias: 'backupbot',
        emoji: ':raised_hands:',
      })
      .then((res) => {
        instance
          .post('/logout')
          .then((res) => console.log('Logged Out'))
          .catch((e) => console.log('Error logging out:', e))
      })
      .catch((e) => console.log(e))
  })

  .catch((e) => {
    console.log(e)
  })
