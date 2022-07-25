<template>
    <div class="questions-box pb-10">
        <div class="flex justify-between mt-2.5 border-b-[1px] border-solid border-gray-40 pb-10">
            <div class="font-bold title">
                Danh sách câu hỏi
            </div>
            <div>
                <a-button
                    type="primary"
                    class="bg-button title-button"
                    @click="$router.push('/utilities/questions/create')"
                >
                    <i class="fas fa-plus-circle mr-2.5" />
                    Tạo câu hỏi
                </a-button>
            </div>
        </div>
        <Filters />
        <Table @removeQuestion="showDialog" @changeStatus="handleChangeStatus" />
        <PaginationCustom
            :per-page="+paginationData.perPage"
            :total="+paginationData.total"
            :page="+paginationData.page"
            @handlePagination="changePage"
        />
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa câu hỏi"
            content="Bạn chắc chắn xóa câu hỏi này chứ"
            @confirm="successRemove"
        />
    </div>
</template>
<script>
    import Table from '@/components/utilities/questions/Table.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import Filters from '@/components/utilities/questions/Filters.vue';
    import PaginationCustom from '@/components/shared/PaginationCustom.vue';
    import { mapState } from 'vuex';

    export default {
        watchQuery: true,
        components: {
            Table,
            ConfirmDialog,
            Filters,
            PaginationCustom,
        },
        async asyncData({ store, query }) {
            await store.dispatch('questions/fetchQuestions', query);
            await store.dispatch('questionCategories/fetchQuestionCategories');
        },
        data() {
            return {
                questionSelected: null,
            };
        },
        computed: {
            ...mapState('questions', ['pagination']),
            paginationData() {
                return this.pagination;
            },
        },
        methods: {
            showDialog(value) {
                this.$refs.ConfirmDialog.open();
                this.questionSelected = value;
            },
            async successRemove() {
                try {
                    this.$refs.ConfirmDialog.loading = true;
                    await this.$api.questions.delete(this.questionSelected.id);
                    this.$message.success('Xóa câu hỏi thành công');
                    this.$nuxt.refresh();
                } catch {
                    this.$message.error('Xóa câu hỏi thất bại');
                } finally {
                    this.$refs.ConfirmDialog.loading = false;
                }
            },
            async handleChangeStatus(data) {
                try {
                    if (data.status === 'active') {
                        await this.$api.questions.inactive(+data.id);
                    } else {
                        await this.$api.questions.active(+data.id);
                    }
                    this.$nuxt.refresh();
                    this.$message.success('Cập nhật trạng thái thành công');
                } catch {
                    this.$message.error('Cập nhật trạng thái thất bại');
                }
            },
            async changePage(page) {
                try {
                    await this.$store.dispatch('questions/fetchQuestions', page);
                } catch {
                    this.$message.error('Không thể tìm thấy dữ liệu');
                }
            },
        },
    };
</script>
<style lang="scss">
.questions-box {
    .transperant-btn {
        @apply bg-transparent text-green-20 border-green-20 #{!important};
    }
    .ant-input-search {
        .ant-input {
            @apply rounded-br-none rounded-tr-none #{!important};
        }
    }
}
</style>
