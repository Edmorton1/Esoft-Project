export const paths = {
  login: '/login',
  registration: '/registration',
  messages: '/messages',
  users: '/users',
  profile: '/profile',
  settings: '/settings',
  room: '/room',
  map: '/map',

  test: "/test",
  liked: "/liked"
} as const

// 'users', 'forms', 'likes', 'messages', 'tags', 'user_tags', 'tokens'

export const serverPaths = {
  login: '/login',
  registration: '/registration',
  logout: "/logout",
  refresh: "/refresh",

  createForm: "/createForm",

  sendMessage: "/sendMessage",
  editMessage: "/editMessage",
  deleteMessage: "/deleteMessage",

  likesSend: "/likesSend",
  likesDelete: "/likesDelete",
  likesGet: "/likesGet",

  postAvatar: "/postAvatar",

  testCompressViedo: "/testCompressViedo",
  testCompressAudio: "/testCompressAudio",

  extendedSearch: "/extendedSearch",

  users: "/users",
  forms: "/forms",
  likes: "/likes",
  messages: "/messages",
  tags: "/tags",
  user_tags: "/user_tags",
  tokens: "/tokens"  
} as const

// export type serverPathsTypes = keyof typeof serverPaths