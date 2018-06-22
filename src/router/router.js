let MyMain=()=>import('@/vuex-project/buj/mymain')
let Email=()=>import('@/vuex-project/buj/email')
let Prolie=()=>import('@/vuex-project/buj/prolie')
let share=()=>import('@/vuex-project/buj/share')
export let myrouter=[
  {
    path:'/main',
    name:'MyMain',
    component:MyMain,
    children:[
      {
        path:'email',
        alias:'e',
        name:'email',
        props:true,
        components:{
          default:Email,
          share,
        },
      },
      {
        path:'prolie',
        name:'prolie',
        props:true,
        component:Prolie
      }
    ]
  },

]
