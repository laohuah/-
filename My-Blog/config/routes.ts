export default [
    { 
      path: '/', 
      component: '@/pages/index', 
      name: '首页' 
    },
    {
      path: '/stu',
      name: '学员管理',
      routes: [
        {
          path: '/stu/list',
          component: '@/pages/stu/list',
          name: '学员列表',
        },
        {
          path: '/stu/pub',
          component: '@/pages/stu/pub',
          name: '学员录入',
        }
      ]
    }
];