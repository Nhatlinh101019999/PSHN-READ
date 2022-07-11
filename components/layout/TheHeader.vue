<template>
    <div class="bg-white py-2 px-4 md:px-6 md:flex md:flex-row-reverse flex justify-between items-center shadow-md">
        <div class="md:hidden cursor-pointer flex gap-8 items-center">
            <i class="fas fa-bars text-lg hover:text-green-100" @click="toggleSidebar" />
            <img src="/images/PSHN/XMLID_1_.png">
        </div>

        <div class="flex items-center gap-5">
            <div class="font-semibold text-lg text-green-100">
                <span class="hidden md:inline">Quản lý ứng dụng bệnh nhân</span>
            </div>
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
