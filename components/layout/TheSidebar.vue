<template>
    <div class="!w-[256px] bg-white a-the-sidebar-vertical max-h-screen h-full flex flex-col justify-between shadow-xl">
        <div>
            <div class="flex justify-between items-center py-4 maxMd:hidden">
                <img src="/images/logo.png" class="!w-3/5 pl-6">
                <button>
                    <i class="far fa-bell pr-4 text-xl hover:text-green-100" />
                </button>
            </div>
            <a-menu
                :default-selected-keys="activeKeys"
                :open-keys.sync="openKeys"
                class="h-auto !ml-3"
                @click="handleClick"
            >
                <a-sub-menu
                    v-for="item in menuItems"
                    :key="item.id"
                    class="hover:!text-green-100 p-2"
                >
                    <template slot="title">
                        <i :class="item.icon" class="w-5" />
                        <span class="!pl-2 w-full !text-lg">{{ item.description }}</span>
                    </template>
                    <a-sub-menu v-for="subMenu in item.subMenus" :key="subMenu.id" class="w-56 hover:!text-green-100 p-2">
                        <template slot="title">
                            <i :class="subMenu.icon" class="w-5" />
                            <span class="!pl-2 w-full !text-lg">{{ subMenu.subTitle }}</span>
                        </template>

                        <a-menu-item v-for="subMenu1 in subMenu.subMenus" :key="subMenu1.link">
                            <span class="!pl-2 w-full !text-lg">{{ subMenu1.subTitle }}</span>
                        </a-menu-item>
                    </a-sub-menu>
                </a-sub-menu>
            </a-menu>
        </div>
        <div class="flex flex-col p-4 border-t-2 border-gray-5">
            <div class="flex items-center mb-2">
                <button>
                    <a-avatar class="shrink-0 border border-gray-10" :src="authUser.avatar" :size="48">
                        <i class="fas fa-user" />
                    </a-avatar>
                </button>
                <nuxt-link class="pl-4 grow hover:!text-green-100" to="/">
                    {{ authUser.fullName }}
                </nuxt-link>
            </div>
            <a-button
                type="primary"
                size="large"
                class="w-full bg-button !border-none !rounded-sm"
                @click="logout"
            >
                <i class="fas fa-sign-out-alt pr-2" />
                ????ng xu???t
            </a-button>
        </div>
    </div>
</template>

<script>
    // import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                openKeys: [],
                collapsed: false,
                menuItems: [
                    {
                        id: '1',
                        description: 'Qu???n l?? ng?????i d??ng',
                        link: '/',
                        icon: 'fas fa-user',
                    },
                    {
                        id: '2',
                        description: 'Qu???n l?? b??c s???',
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
                        description: 'Qu???n l?? b???nh nh??n',
                        link: '/',
                        icon: 'fas fa-user-injured',
                    },
                    {
                        id: '4',
                        description: '?????t l???ch kh??m',
                        link: '/',
                        icon: 'fas fa-calendar-alt',
                    },
                    {
                        id: '5',
                        description: 'Qu???n l?? h???i nh??m',
                        link: '/',
                        icon: 'fas fa-tasks',
                    },
                    {
                        id: '6',
                        description: 'H???i ????p',
                        link: '/',
                        icon: 'fas fa-question-circle',
                    },
                    {
                        id: '7',
                        description: 'Ti???n ??ch',
                        subMenus: [
                            { id: '7.1', subTitle: 'D??? sinh', link: '/' },
                            {
                                id: '7.2', subTitle: 'T???ng ????i', link: '/', icon: 'fas fa-phone-alt',
                            },
                            {
                                id: '7.3',
                                subTitle: 'Dinh d?????ng',
                                link: '/',
                                icon: 'fas fa-hamburger',
                                subMenus: [
                                    { id: '7.3.1', subTitle: 'Danh m???c', link: '/utilities/nutritions' },
                                    {
                                        id: '7.3.2', subTitle: 'Danh s??ch th???c ph???m', link: '/utilities/foods',
                                    },
                                ],
                            },
                            {
                                id: '7.4',
                                subTitle: 'Tr???c nghi???m',
                                link: '/',
                                icon: 'fas fa-question',
                                subMenus: [
                                    { id: '7.4.1', subTitle: 'Danh m???c', link: '/utilities/questions/categories' },
                                    {
                                        id: '7.4.2', subTitle: 'C??u h???i', link: '/utilities/questions',
                                    },
                                ],
                            },
                            {
                                id: '7.5', subTitle: 'Checklist', link: '/', icon: 'fas fa-list-alt',
                            },
                            {
                                id: '7.6', subTitle: 'G??p ??', link: '/', icon: 'fas fa-comments',
                            },
                            {
                                id: '7.7', subTitle: '?????a ch???', link: '/', icon: 'fas fa-map-marker-alt',
                            },
                        ],
                        link: '/utilities',
                        icon: 'fas fa-shapes',
                    },
                    {
                        id: '8',
                        description: 'Qu???n l?? banner',
                        link: '/',
                        icon: 'fas fa-bullhorn',
                    },
                    {
                        id: '9',
                        description: 'Qu???n l?? tin t???c',
                        link: '/',
                        icon: 'fas fa-newspaper',
                    },
                    {
                        id: '10',
                        description: 'Qu???n l?? ph??n quy???n',
                        link: '/',
                        icon: 'fas fa-user-cog',
                    },
                    {
                        id: '11',
                        description: 'C??i ?????t',
                        link: '/',
                        icon: 'fas fa-sliders-h',
                    },
                ],
            };
        },

        computed: {
            // ...mapGetters(['menuItems']),

            authUser() {
                return this.$auth.user || {};
            },

            activeKeys() {
                return [this.$route.path];
            },
        },

        async mounted() {
            this.collapsed = localStorage.getItem('collapsed') || false;
            // await this.$store.dispatch('fetchMenuItems');
        },

        methods: {
            handleClick(link) {
                this.$router.push(link.key);
            },

            async logout() {
                await this.$auth.logout();
                this.$router.push('/login');
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
