import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login'
import HelloWorld from '../components/HelloWorld'
const Home = ()=>import('../views/home/home')
const Article =()=> import('views/home/component/Article')
const ArticlePublish =()=> import('views/home/component/ArticlePublish')
const Stuff = ()=> import('views/stuff/Stuff')
const Comment = ()=> import('views/comment/Comment')
const Profile =()=> import('views/profile/Profile')

Vue.use(VueRouter)

const routes = [{
  path:'/',
  name:'login',
  component:Login
},
{
  path:'/home',
  component:Home,
  children:[
    {
      path:'',
      component:HelloWorld
    },{
      path:'/home/article',
      name: 'article',
      component:Article
    },{
      path:'/home/publish',
      name:'publish',
      component:ArticlePublish
    },{
      path:'/home/stuff',
      name:'stuff',
      component:Stuff
    },{
      path:'/home/comment',
      name:'comment',
      component:Comment
    },{
      path:'/home/profile',
      name:'profile',
      component:Profile
    }
  ]
}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log("hahahah" + to.path);
  if(to.path !== '/'){
    let user = JSON.parse(window.localStorage.getItem('data'));
    if(user){
      console.log('has logined')
      next()
    }else{
      next('/')
    }
  }else{
    next()
  }
})

export default router
