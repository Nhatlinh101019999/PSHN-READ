<template>
    <div class="bg-white py-2 px-4 md:px-6 md:flex md:flex-row-reverse flex justify-between items-center shadow-md">
        <div class="md:hidden cursor-pointer gap-4 flex items-center">
            <i class="fas fa-bars text-lg hover:text-green-100 mx-4" @click="toggleSidebar" />
            <img src="/images/logo.png" class="w-16">
            <span class="hidden sm:block md:hidden ml-2 font-semibold text-lg text-green-100">
                Bệnh viện Phụ sản Hà Nội
            </span>
        </div>

        <div class="flex items-center gap-5">
            <span class="hidden md:block font-semibold text-lg text-green-100">
                Quản lý ứng dụng bệnh nhân
            </span>
            <button><i class="fas fa-th text-5xl maxMd:text-6xl text-green-100 hover:text-green-10" /></button>
        </div>

        <a-drawer
            class="header-sidebar-drawer md:hidden"
            :closable="false"
            :visible="sidebarVisible"
            placement="left"
            @close="sidebarVisible = false"
        >
            <TheSidebar />
        </a-drawer>
    </div>
</template>

<script>
    import TheSidebar from '@/components/layout/TheSidebar.vue';

    export default {
        components: {
            TheSidebar,
        },

        data() {
            return {
                sidebarVisible: false,
            };
        },

        methods: {
            toggleSidebar() {
                this.sidebarVisible = !this.sidebarVisible;
            },
        },
    };
</script>

<style lang="scss">
.header-sidebar-drawer {
  .ant-drawer-body {
    @apply p-0 h-full #{!important};
  }
}
</style>
