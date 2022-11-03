<template>
    <div>
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
        <Table :data="category" @handleDelete="handleDelete" @handleEdit="handleEdit" />
        <ConfirmDialog
            ref="DialogDelete"
            title="Xóa danh mục tin tức"
            content="Bạn muốn xóa danh mục này không"
            @confirm="successDelete"
        />
        <Dialog ref="OpenDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Dialog from '../../../components/newCategory/Dialog.vue';
    import Table from '../../../components/newCategory/table.vue';
    import ConfirmDialog from '../../../components/shared/ConfirmDialog.vue';

    export default {
        components: { Table, ConfirmDialog, Dialog },
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                category: null,
            };
        },
        computed: {
            ...mapState('newsCategory', ['category']),
        },
        methods: {
            async fetchData() {
                try {
                    await this.$store.dispatch('newsCategory/fetchCategory');
                } catch (error) {
                    this.$handerErro(error);
                }
            },
            handleDelete(category) {
                this.category = category;
                this.$refs.DialogDelete.open(category);
            },
            async successDelete() {
                try {
                    await this.$api.newsCategory.delete(this.category.id);
                } catch (error) {
                    this.$handerErro(error);
                }
            },
            handleEdit(category) {
                this.$refs.OpenDialog.open(category);
            },
            handleAdd() {
                this.$refs.OpenDialog.open();
            },
        },
    };
</script>

<style>

</style>
