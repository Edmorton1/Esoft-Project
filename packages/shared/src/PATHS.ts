export const paths = {
  admin: "/admin",
  login: '/login',
  registration: '/registration',
  messages: '/messages',
  users: '/users',
  profile: '/profile',
  settings: '/settings',
  room: '/room',
  map: '/map',

  test: "/test",
  liked: "/liked",

  pairs: "/pairs"
} as const

// 'users', 'forms', 'likes', 'messages', 'tags', 'user_tags', 'tokens'

export const serverPaths = {
  login: '/login',
  registration: '/registration',
  logout: "/logout",
  // refresh: "/refresh",
  initial: "/initial",
  checkEmail: "/checkEmail",

  createForm: "/createForm",

  sendMessage: "/sendMessage",
  editMessage: "/editMessage",
  deleteMessage: "/deleteMessage",
  getMessage: "/getMessage",

  likesSend: "/likesSend",
  likesDelete: "/likesDelete",
  likesGet: "/likesGet",
  likesPairs: "/likesPairs",
  rejectLike: "/rejectLike",

  postAvatar: "/postAvatar",

  testCompressViedo: "/testCompressViedo",
  testCompressAudio: "/testCompressAudio",

  extendedSearch: "/extendedSearch",

  outsideMessages: "/outsideMessages",

  users: "/users",
  forms: "/forms",
  likes: "/likes",
  messages: "/messages",
  tags: "/tags",
  user_tags: "/user_tags",

  passwordCompare: "/passwordCompare",
  profilePut: "/profilePut",

  searchForm: "/searchForm",
  profileGet: "/profileGet",

  postsGet: "/postsGet",
  postsPost: "/postsPost",
  postsPut: "/postsPut",
  postsDelete: "/postsDelete",

  yandexGetToken: "/yandexGetToken"
} as const

// export type serverPathsTypes = keyof typeof serverPaths