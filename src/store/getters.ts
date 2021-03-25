const getters = {
  sidebar: (state: any) => state.app.sidebar,
  device: (state: any) => state.app.device,
  version: (state: any) => state.app.version,
  token: (state: any) => state.user.token,
  avatar: (state: any) => state.user.avatar,
  name: (state: any) => state.user.name,
  roles: (state: any) => state.user.roles,
  permission_routes: (state: any) => state.permission.routers,
  addRouters: (state: any) => state.permission.addRouters,
  historyParams: state => state.history.historyParams
}

export default getters