<template>
    <a-modal
        v-model="status"
        class="add-multiplechoice-category"
        :footer="false"
        :confirm-loading="loading"
        :title="category ? 'Chỉnh sửa danh mục': 'Thêm mới danh mục'"
    >
        <div>
            <a-form-model
                ref="categoryForm"
                :model="form"
                :rules="rules"
            >
                <a-form-model-item has-feedback label="Tên danh mục" prop="name">
                    <span class="mt-3 block">
                        <a-input v-model="form.name" placeholder="Vui lòng nhập" size="large" />
                    </span>
                </a-form-model-item>
            </a-form-model>
            <a-button
                type="primary"
                class=" bg-button title-button w-full mt-7"
                :loading="loading"
                @click="submitForm"
            >
                Xác nhận
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';

    const defaultForm = {
        id: '',
        name: '',
    };
    export default {
        name: 'ChangePasswordModal',
        data() {
            return {
                status: false,
                loading: false,
                category: null,
                form: this.category ? _cloneDeep(this.category) : _cloneDeep(defaultForm),
                rules: {
                    name: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                },
            };
        },
        watch: {
            category() {
                this.form = this.category ? _cloneDeep(this.category) : _cloneDeep(defaultForm);
            },
        },
        methods: {
            submitForm() {
                this.$refs.categoryForm.validate(async (valid) => {
                    if (valid) {
                        if (this.category) {
                            await this.updateCategory(this.form);
                        } else {
                            await this.createCategory(this.form);
                        }
                        this.$nuxt.refresh();
                        this.close();
                    }
                });
            },
            open(value) {
                this.category = value;
                this.status = true;
            },
            close() {
                this.status = false;
            },
            async updateCategory(form) {
                try {
                    this.loading = true;
                    await this.$api.questionCategories.update(form.id, {
                        ...form,
                    });
                    this.close();
                    this.$message.success('Chỉnh sửa danh mục thành công');
                } catch {
                    this.$message.error('Chỉnh sửa danh mục thất bại');
                } finally {
                    this.loading = false;
                }
            },
            async createCategory(form) {
                try {
                    this.loading = true;
                    await this.$api.questionCategories.create({
                        ...form,
                    });
                    this.close();
                    this.$message.success('Thêm mới danh mục thành công');
                } catch {
                    this.$message.error('Thêm mới danh mục thất bại');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

<style lang="scss">
    .add-multiplechoice-category {
        .anticon {
            &.anticon-close {
                @apply text-white bg-black p-1 rounded-full
            }
        }
        .ant-modal {
            .ant-form-explain {
                @apply absolute -bottom-6;
            }
        }
        .ant-modal-footer {
            button {
                @apply w-32;
            }
            div {
                @apply flex justify-center gap-5;
            }
        }
        .ant-modal-header {
            @apply border-b-0;
        }
    }
</style>
