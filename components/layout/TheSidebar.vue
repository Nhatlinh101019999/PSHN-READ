<template>
    <div class="!w-[260px] bg-[#031634] a-the-sidebar-vertical max-h-screen h-full flex flex-col">
        <div class="flex justify-between items-center pt-4 px-4">
            <nuxt-link to="/">
                <img src="/images/logo-3.png" width="150">
            </nuxt-link>
        </div>
        <a-menu
            :default-selected-keys="activeKeys"
            :open-keys.sync="openKeys"
            :inline-collapsed="collapsed"
            class="!mt-6 w-[260px] flex-grow overflow-y-auto custom-scroll overflow-x-hidden !p-4"
            mode="inline"
            @click="handleClick"
        >
            <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.route">
                <template slot="title">
                    <i :class="menuItem.icon" />
                    <span class="truncate">{{ menuItem.description }}</span>
                </template>
                <template v-for="menuItemChild in menuItem.childs">
                    <a-menu-item v-if="menuItemChild.route" :key="menuItemChild.route">
                        <span class="truncate">{{ menuItemChild.description }}</span>
                    </a-menu-item>
                </template>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                isOpen: true,
                openKeys: [],
                logoutVisible: false,
                documentCount: {},
                collapsed: false,
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

            toggleCollapsed() {
                this.collapsed = !this.collapsed;
                localStorage.setItem(this.localStorage);
            },
        },
    };
</script>

<style lang="scss">
    .a-the-sidebar-vertical:not(.a-menu--collapse) {
        @apply w-[256px];
        .ant-menu {
            @apply bg-[#031634];
        }
        .ant-menu-inline {
            @apply border-0;
        }
        .ant-menu-sub {
            .ant-menu-item {
                @apply pl-8 #{!important};
            }
        }
        .ant-menu-submenu-arrow {
            @apply text-right;
        }
        .ant-menu-item, .ant-menu-submenu-title {
            height: auto !important;
            @apply text-white flex items-center;
            @apply m-0 px-4 my-2 rounded  #{!important};

            >span {
                @apply flex-grow;
            }

            i {
                @apply text-lg w-4 mr-4 mb-1 #{!important};
            }

            .ant-menu-submenu-arrow {
                @apply mr-0;
                &::after, &::before {
                    @apply bg-white #{!important};
                }
            }

            &-selected {
                @apply bg-[#2ea1ff];
                &::after {
                    @apply hidden;
                }
            }
        }
    }
</style>
