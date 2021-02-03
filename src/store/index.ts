import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import history from './modules/history'
import user from './modules/user'

const store = createStore({
  modules: {
    app,
    permission,
    history,
    user
  },
  getters
})

export default store