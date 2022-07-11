<template>
    <div class="flex justify-between bg-[#f8f8f8] min-h-screen">
        <div class="hidden md:block">
            <TheSidebar />
        </div>
        <div class="flex-grow flex flex-col h-screen overflow-x-hidden">
            <TheHeader />
            <div class="flex-grow overflow-y-auto max-h-screen custom-scroll">
                <Nuxt />
            </div>
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
