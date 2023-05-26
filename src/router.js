import auth from "./auth";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Home from "./views/home-page";
import Profile from "./views/profile-page";
import Users from "./views/users-page";
import defaultLayout from "./layouts/side-nav-inner-toolbar";
import simpleLayout from "./layouts/single-card";

function loadView(view) {
  return () => import(/* webpackChunkName: "login" */ `./views/${view}.vue`)
}

const router = new createRouter({
  routes: [
    {
      path: "/home",
      name: "home",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Profile
    },
    {
      path: "/users",
      name: "users",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Users
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Sign In"
      },
      component: loadView("login-form")
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home"
    }
  ],
  history: createWebHistory()
});

router.beforeEach((to, from, next) => {

  const user = JSON.parse(window.localStorage.getItem('user'));

  if (to.name === "login-form" && auth.loggedIn()) {
    next({ name: "home" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
