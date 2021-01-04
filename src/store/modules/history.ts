const history = {
  state: {
    historyParams: {
      // Pending: {  // Pending ： 路由name
      //   NewUsers: {  // NewUsers： 页面name
      //     pos: 0,
      //     currentPage: 0
      //   },
      //   EditInfo: null  // EditInfo： 页面name
      // },
    }
  },
  mutations: {
    CHANGE_PARAMS: (state: any, params: any) => {
      const arr = params.name.split('/')
      if (!state.historyParams) state.historyParams = {}
      if (state.historyParams.hasOwnProperty(arr[0])) {
        state.historyParams[arr[0]][arr[1]] = params.history
      } else {
        state.historyParams[arr[0]] = {}
        state.historyParams[arr[0]][arr[1]] = params.history
      }
    },
    // 点击侧边栏触发
    RESET_STATE: (state: any, params: any) => {
      console.log('params.name', params.name)
      // state.historyParams = {}
      if (state.historyParams.hasOwnProperty(params.name)) {
        Object.keys(state.historyParams[params.name]).forEach(key => {
          state.historyParams[params.name][key] = null
        })
      }
    },
    RESET_STATE_BY_NAME: (state: any, params: any) => {
      if (state.historyParams.hasOwnProperty(params.parentName)) {
        if (params.children.length) { // 如果children不为空，根据children清除，如果为空，全部清除
          Object.keys(state.historyParams[params.parentName]).forEach(key => {
            if (params.children.find((value:any) => value === key)) {
              state.historyParams[params.parentName][key] = null
            }
          })
        } else {
          state.historyParams[params.parentName] = {}
        }
      }
    },
    RESET_HISTORY_STATE_ALL: (state:any) => {
      state.historyParams = {}
    }
  },
  actions: {
    ChangeParams: ({ commit }: any, params: any) => {
      commit('CHANGE_PARAMS', params)
    },
    ResetState: ({ commit }:any, params: any) => {
      commit('RESET_STATE', params)
    },
    ResetStateByName: ({ commit }: any, params: any) => {
      commit('RESET_STATE_BY_NAME', params)
    },
    ResetHistoryStateAll: ({ commit }:any, params: any) => {
      commit('RESET_HISTORY_STATE_ALL')
    }
  }
}
export default history
