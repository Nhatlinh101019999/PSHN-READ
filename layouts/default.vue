<template>
    <div class="flex justify-between bg-[#f8f8f8] h-screen">
        <div class="hidden md:block">
            <TheSidebar class="border-r border-gray-10" />
        </div>
        <div class="flex-grow flex flex-col h-screen overflow-x-hidden">
            <TheHeader />
            <Nuxt class="flex-grow overflow-y-auto p-4 custom-scroll" />
        </div>
    </div>
</template>

<script>
    import TheSidebar from '@/components/layout/TheSidebar.vue';
    import TheHeader from '@/components/layout/TheHeader.vue';

    export default {
        components: {
            TheSidebar,
            TheHeader,
        },
    };
</script>
