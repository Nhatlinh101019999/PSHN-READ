<template>
    <div>
        <div class="flex justify-between">
            <h3>Danh sách bài viết</h3>
            <a-button type="primary" @click="$router.push('/create')">
                <i class="fas fa-plus p-2 rounded-full text-white" />
                Thêm bài viết mới
            </a-button>
        </div>
        <a-divider class=" !w-full !h-0.5 !mx-0 !my-6" type="vertical" />
        <Table :listnews="listnews" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Table from '../../../components/news/Table.vue';

    export default {
        components: { Table },
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapState('news', ['listnews']),
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('news/fetchNews');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            handleAdd() {
                this.$store.commit('address/ADD_ADDRESS');
            },
        },

    };
</script>

<style>

</style>
