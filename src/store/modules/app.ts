import Cookies from 'js-cookie'
// console.log(Cookies.get('sidebarStatus'), !!+Cookies.get('sidebarStatus'))
let value: any = ''
value = Cookies.get('sidebarStatus')
const state = {
  sidebar: {
    opened: value ? !!+value : true,
    withoutAnimation: false
  },
  device: 'desktop',
  version: '1.1.1',
  badges: {}
}

const mutations = {
  TOGGLE_SIDEBAR: (state: any) => {
    // console.log(state)
    state.sidebar.opened = !state.sidebar.opened
    // console.log(state.sidebar.opened)
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state: any, withoutAnimation: any) => {
    Cookies.set('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: any, device: string) => {
    state.device = device
  },
  SET_CHECK_BADGES: (state: any, badges: any) => {
    state.badges = badges
  }
}

const actions = {
  toggleSideBar({ commit }: any) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }: any, { withoutAnimation }: any) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: any, device: string) {
    commit('TOGGLE_DEVICE', device)
  },
  checkBadges({ commit }: any, badges: any) {
    commit('SET_CHECK_BADGES', badges)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
