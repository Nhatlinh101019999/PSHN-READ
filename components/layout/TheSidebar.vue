<template>
    <div class="!w-[256px] bg-white a-the-sidebar-vertical max-h-screen h-full flex flex-col justify-between shadow-xl">
        <div>
            <div class="flex justify-between items-center py-4 maxMd:hidden">
                <img src="/images/PSHN/XMLID_1_.png" class="pl-6">
                <button>
                    <i class="far fa-bell pr-4 text-xl hover:text-green-100" />
                </button>
            </div>
            <a-menu
                :default-selected-keys="activeKeys"
                :open-keys.sync="openKeys"
                class="h-auto"
                @click="handleClick"
            >
                <a-sub-menu v-for="item in menuItems" :key="item.id" class="hover:!text-green-100 p-2">
                    <template slot="title">
                        <i :class="item.icon" class="w-5" />
                        <span class="!pl-2 w-full !text-lg">{{ item.description }}</span>
                    </template>
                    <a-menu-item v-for="subMenu in item.subMenus" :key="subMenu.id">
                        {{ subMenu.subTitle }}
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </div>
        <div class="flex flex-col p-4 border-t-2 border-gray-5">
            <div class="flex items-center mb-2">
                <button>
                    <a-avatar class="shrink-0">
                        <i class="fas fa-user" />
                    </a-avatar>
                </button>
                <nuxt-link class="pl-4 grow hover:!text-green-100" to="/">
                    Nguyễn Hoàng Tuấn Anh
                </nuxt-link>
            </div>
            <a-button
                :loading="loading"
                type="primary"
                size="large"
                class="w-full !bg-gradient-to-tr from-green-10 to-green-20 !border-none !rounded-sm"
                @click="handleSubmit"
            >
                <i class="fas fa-sign-out-alt pr-2" />
                Đăng xuất
            </a-button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                openKeys: [],
                collapsed: false,
                menuItems: [
                    {
                        id: '1',
                        description: 'Quản lý người dùng',
                        link: '/',
                        icon: 'fas fa-user',
                    },
                    {
                        id: '2',
                        description: 'Quản lý bác sỹ',
                        subMenus: [
                            { id: '2.1', subTitle: 'text 1' },
                            { id: '2.2', subTitle: 'text 2' },
                            { id: '2.3', subTitle: 'text 3' },
                        ],
                        link: '/',
                        icon: 'fas fa-stethoscope',
                    },
                    {
                        id: '3',
                        description: 'Quản lý bệnh nhân',
                        link: '/',
                        icon: 'fas fa-user-injured',
                    },
                    {
                        id: '4',
                        description: 'Đặt lịch khám',
                        link: '/',
                        icon: 'fas fa-calendar-alt',
                    },
                    {
                        id: '5',
                        description: 'Quản lý hội nhóm',
                        link: '/',
                        icon: 'fas fa-tasks',
                    },
                    {
                        id: '6',
                        description: 'Hỏi đáp',
                        link: '/',
                        icon: 'fas fa-question-circle',
                    },
                    {
                        id: '7',
                        description: 'Tiện ích',
                        subMenus: [
                            { id: '7.1', subTitle: 'text 1', link: '/' },
                            { id: '7.2', subTitle: 'text 2', link: '/' },
                            { id: '7.3', subTitle: 'text 3', link: '/' },
                        ],
                        link: '/utilities',
                        icon: 'fas fa-shapes',
                    },
                    {
                        id: '8',
                        description: 'Quản lý banner',
                        link: '/',
                        icon: 'fas fa-bullhorn',
                    },
                    {
                        id: '9',
                        description: 'Quản lý tin tức',
                        link: '/',
                        icon: 'fas fa-newspaper',
                    },
                    {
                        id: '10',
                        description: 'Quản lý phân quyền',
                        link: '/',
                        icon: 'fas fa-user-cog',
                    },
                    {
                        id: '11',
                        description: 'Cài đặt',
                        link: '/',
                        icon: 'fas fa-sliders-h',
                    },
                ],
            };
        },

        computed: {
            ...mapGetters(['menuItems']),

            activeKeys() {
                return [this.$route.path];
            },
        },

        async mounted() {
            this.collapsed = localStorage.getItem('collapsed') || false;
            await this.$store.dispatch('fetchMenuItems');
        },

        methods: {
            handleClick(link) {
                this.$router.push(link.key);
            },
            handleSubmit() {},
        },
    };
</script>

<style lang="scss">
.a-the-sidebar-vertical:not(.a-menu--collapse) {
  .ant-menu-inline {
    @apply border-0;
  }
  .ant-menu-submenu {
    @apply flex flex-col py-4;
  }
  .ant-menu-item,
  .ant-menu-submenu-title {
    height: auto !important;
    @apply flex items-center;
    @apply m-0 px-1 text-sm #{!important};
  }
}
</style>
