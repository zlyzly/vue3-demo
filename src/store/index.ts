import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import history from './modules/history'
// import settings from './modules/settings'
import user from './modules/user'

const store = createStore({
  modules: {
    app,
    permission,
    history,
    // settings,
    user
  },
  getters
})

export default store