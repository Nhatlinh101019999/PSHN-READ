<template>
    <div class="questions-box pb-10">
        <div class="flex justify-between mt-2.5 border-b-[1px] border-solid border-gray-40 pb-10">
            <div class="font-bold title">
                Danh mục tin tức
            </div>
            <div>
                <a-button
                    type="primary"
                    class="bg-button title-button"
                    @click="handleAdd"
                >
                    <i class="fas fa-plus-circle mr-2.5" />
                    Thêm danh mục tin tức
                </a-button>
            </div>
        </div>
        <Table :data="newsCategory" @handleDelete="handleOpenDialog" @handleEdit="handleEditOpenDialog" />
        <ConfirmDialog
            ref="openDialog"
            title="Xóa danh mục tin tức"
            content="Bạn có muốn xóa danh mục này"
            @confirm="successRemove"
        />
        <Dialog ref="EditDialog" />
        <PaginationCustom
            :per-page="+pagination.perPage"
            :total="+pagination.total"
            :page="+pagination.page"
        />
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    import PaginationCustom from '@/components/shared/PaginationCustom.vue';
    import Table from '../../../components/newCategory/table.vue';
    import ConfirmDialog from '../../../components/shared/ConfirmDialog.vue';
    import Dialog from '../../../components/newCategory/Dialog.vue';

    export default {
        components: {
            Table,
            ConfirmDialog,
            Dialog,
            PaginationCustom,
        },
        watchQuery: true,
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                currentNewsCategoryId: null,
            };
        },
        computed: {
            ...mapState('newsCategories', ['newsCategory', 'pagination']),
        },

        // chạy khi query thay đổi
        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
                },
                deep: true,
            },
        },

        methods: {

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('newsCategories/fetchCategory');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async successRemove() {
                try {
                    await this.$api.newsCategories.delete(this.currentNewsCategoryId);
                    this.$message.success('Xóa câu hỏi thành công');
                    this.$nuxt.refresh();
                } catch {
                    this.$message.error('Xóa câu hỏi thất bại');
                }
            },
            handleOpenDialog(value) {
                this.currentNewsCategoryId = value.id;
                this.$refs.openDialog.open(value);
            },
            handleEditOpenDialog(value) {
                this.$refs.EditDialog.open(value);
            },
            handleAdd() {
                this.$refs.EditDialog.open();
            },
        },

    };
</script>

<style>

</style>
