<template>
    <div>
        <div class="flex justify-between mt-2.5">
            <div class="font-bold title">
                Danh mục câu hỏi
            </div>
            <a-button
                type="primary"
                class=" bg-button title-button"
                @click="$refs.CategoryDialog.open()"
            >
                <i class="fas fa-plus-circle mr-2.5 " />
                Thêm danh mục câu hỏi
            </a-button>
        </div>
        <div class="mt-10">
            <div
                v-for="(items, index) in dataSoucre"
                :key="index"
                class="flex justify-between items-center pb-6"
            >
                <div class="flex items-center">
                    <a-popover placement="bottomLeft" class="z-0">
                        <template slot="content" trigger="click">
                            <div class="w-40 cursor-pointer action-button" @click="handleEdit(items)">
                                Chỉnh sửa
                            </div>
                            <div class="mt-3 cursor-pointer action-button text-red-100" @click="handleDelete(items.id)">
                                Xóa
                            </div>
                        </template>
                        <div class=" cursor-pointer">
                            <i class="fas fa-ellipsis-h mr-3" />
                        </div>
                    </a-popover>
                    <div class="font-semibold text-base ">
                        {{ items.name }}
                    </div>
                </div>
                <div class="w-40">
                    Ngày tạo: {{ items.createdAt | dateFormat }}
                </div>
            </div>
        </div>

        <CategoryDialog ref="CategoryDialog" />
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa danh mục"
            content="Bạn chắc chắn xóa danh mục này chứ"
            @confirm="successDelete"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import CategoryDialog from '@/components/utilities/questions/Dialog.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        name: 'MultipleChoiceCategory',
        components: {
            CategoryDialog,
            ConfirmDialog,
        },
        async asyncData({ store }) {
            await store.dispatch('questionCategories/fetchQuestionCategories');
        },
        data() {
            return {
                idCategory: null,
            };
        },
        computed: {
            ...mapState('questionCategories', ['questionCategories']),
            dataSoucre() {
                return this.questionCategories;
            },
        },
        methods: {
            async handleEdit(value) {
                this.$refs.CategoryDialog.open(value);
            },
            async successDelete() {
                try {
                    this.$refs.ConfirmDialog.loading = true;
                    await this.$api.questionCategories.delete(+this.idCategory);
                    this.$nuxt.refresh();
                    this.$message.success('Xóa danh mục câu hỏi thành công');
                } catch {
                    this.$message.error('Xóa danh mục câu hỏi thất bại');
                } finally {
                    this.$refs.ConfirmDialog.loading = false;
                }
            },
            handleDelete(value) {
                this.$refs.ConfirmDialog.open();
                this.idCategory = value;
            },
        },
    };
</script>
