<template>
    <div class="questions-box pb-10">
        <div class="flex justify-between mt-2.5 border-b-[1px] border-solid border-gray-40 pb-10">
            <div class="font-bold title">
                Danh sách bệnh nhân
            </div>
            <div>
                <a-button
                    type="primary"
                    class="bg-button title-button"
                    @click="$router.push('/patient/create')"
                >
                    <i class="fas fa-plus-circle mr-2.5" />
                    Thêm bệnh nhân
                </a-button>
            </div>
        </div>
        <Filter1 />
        <Table1 />
        <!--
            <Table
            @removeQuestion="showDialog"
            @changeStatus="handleChangeStatus"
        /> -->
        <PaginationCustom
            :per-page="+pagination.perPage"
            :page="+pagination.page"
            :total="+pagination.total"
            @handlePagination="fetchPanigation"
        />

        <!-- <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa câu hỏi"
            content="Bạn chắc chắn xóa câu hỏi này chứ"
            @confirm="successRemove"
        /> -->
    </div>
</template>

<script>

    import Table1 from '@/components/patient/Table.vue';

    import { mapState } from 'vuex';
    import Filter1 from '../../components/patient/Filter.vue';
    import PaginationCustom from '../../components/shared/PaginationCustom.vue';
    // import ConfirmDialog from '../../components/shared/ConfirmDialog.vue';s
    // import PatientFilter from '../../components/petient/Filter.vue';
    export default {
        components: {
            Table1,
            Filter1,
            PaginationCustom,
        },
        // methods: {

        //     handleChangeStatus(payload) {
        //         if (payload.status === 'active') {
        //             payload.status = 'no';
        //         } else {
        //             payload.status = 'active';
        //         }
        //     },
        //     handleRemoveStatus(payload) {
        //         this.$refs.ConfirmDialog.open(payload);
        //     },

        // },

        async fetch() {
            await this.fetchData();
        },
        computed: {
            ...mapState('patient', ['pagination']),
        },
        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
                },
            },
        },
        mounted() {
            console.log(this.pagination);
        },
        methods: {

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('patient/fetchPatient', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            async fetchPanigation(page) {
                try {
                    await this.$store.dispatch('patient/fetchPatient', page);
                } catch {
                    this.$message.error('Không thể tìm thấy dữ liệu');
                }
            },
        },

    };
</script>

<style>

</style>
