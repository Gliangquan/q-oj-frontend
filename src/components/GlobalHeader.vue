<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" />
            <div class="title">Title</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <a-dropdown trigger="hover" v-if="isLogin">
        <div style="cursor:pointer;display:flex;align-items:center;">
          <a-avatar :size="36">
            <img v-if="loginUser.avatarUrl" :src="loginUser.avatarUrl" alt="avatar" />
            <template v-else>
              <img src="../assets/logo.png" alt="avatar" />
            </template>
          </a-avatar>
          <span style="margin-left:8px;vertical-align:middle;">{{ loginUser.userAccount }}</span>
        </div>
        <template #content>
          <a-doption @click="handleLogout">退出登录</a-doption>
        </template>
      </a-dropdown>
      <a-dropdown trigger="hover" v-else>
        <div style="cursor:pointer;display:flex;align-items:center;">
          <a-avatar :size="36">
            <img src="../assets/logo.png" alt="avatar" />
          </a-avatar>
          <span style="margin-left:8px;vertical-align:middle;">未登录</span>
        </div>
        <template #content>
          <a-doption @click="goLogin">去登录</a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "admin",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const loginUser = computed(() => store.state.user?.loginUser || {});
const isLogin = computed(() => loginUser.value.userAccount && loginUser.value.userAccount !== "未登录");
// console.log(loginUser.value.userAccount);
// console.log(isLogin.value);


const handleLogout = async () => {
  await store.dispatch("user/logout");
  router.push("/user/login");
};
const goLogin = () => {
  router.push("/user/login");
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
