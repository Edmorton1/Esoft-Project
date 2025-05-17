export const paths = {
  login: '/login',
  registration: '/registration',
  messages: '/messages',
  users: '/users',
  profile: '/profile',
  settings: '/settings',
  room: '/room',

  test: "/test"
} as const

export const serverPaths = {
  login: '/login',
  registration: '/registration',
  logout: "/logout",
  refresh: "/refresh",

  createForm: "/createForm",

  sendMessage: "/sendMessage",
  editMessage: "/editMessage",
  deleteMessage: "/deleteMessage",

  likesGet: "/likesGet",
  likesDelete: "/likesDelete",

  postAvatar: "/postAvatar",

  testCompressViedo: "/testCompressViedo",
  testCompressAudio: "/testCompressAudio",

  extendedSearch: "/extendedSearch"
} as const

// export type serverPathsTypes = keyof typeof serverPaths