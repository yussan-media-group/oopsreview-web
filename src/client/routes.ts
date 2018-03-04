import Home from './containers/home/index.vue'
import Error from './containers/error/index.vue'
import Post from './containers/post/index.vue'
import PostDetail from './containers/post/detail.vue'
import StaticDetail from './containers/static/index.vue'

import Auth from './containers/auth/index.vue'
import SuperPost from './containers/super-posts/index.vue'
import NewPost from './containers/super-posts/new.vue'

import SuperLayout from './layouts/super.vue'
import DefaultLayout from './layouts/default.vue'
import ErrorLayout from './layouts/error.vue'

export default [
  // public page
  { 
    path: '/', 
    component: DefaultLayout, 
    children : [
      { path: '/', component: Home },
      { path: '/posts', component: Post },
      { path: '/search', name: 'search', component: Post },
      { path: '/tag/:tag_name', props: true, component: Post },
      { path: '/post/:title-:id', name: 'post-detail', component: PostDetail },
      { path: '/static/:title', name: 'static-detail', component:  StaticDetail },
    ]
  },
  // super page auth
  {
    path: '/super',
    component: DefaultLayout,
    children : [
      { path: '/', component: Auth }
    ]
  },
  {
    path: '/super',
    component: SuperLayout,
    children : [
      { path: '/super/posts/new', name:'new-post', component: NewPost },
      { path: '/super/posts', name:'post', component: SuperPost },
    ]
  },
  // default page
  { 
    path: '*', 
    component:  ErrorLayout,
    children : [
      { path: '*', component: Error }
    ]
  }
]