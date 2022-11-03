<template>
    <a-modal
        :footer="null"
        :visible="visible"
        destroy-on-close
        width="800px"
        :title="checklist ? 'Chỉnh sửa Checklist' : 'Thêm Checklist'"
        @cancel="close"
    >
        <ChecklistForm
            ref="checklistForm"
            :checklist="checklist"
            :loading="loading"
            :edit="false"
            @submit="handleSubmit"
        />
        <a-button
            type="primary"
            class="w-full bg-button !border-none !rounded-md !mt-2"
            :loading="loading"
            @click="$refs.checklistForm.submit()"
        >
            {{ checklist ? 'Cập nhật' : 'Thêm Checklist' }}
        </a-button>
    </a-modal>
</template>

<script>
    import ChecklistForm from '@/components/utilities/checklist/Form.vue';

    export default {
        components: {
            ChecklistForm,
        },
        data() {
            return {
                checklist: null,
                visible: false,
                loading: false,
                closable: false,
            };
        },
        methods: {
            open(checklist) {
                this.checklist = checklist;
                this.visible = true;
            },
            close() {
                this.visible = false;
                this.checklist = null;
            },
            async handleSubmit(checklist) {
                try {
                    this.loading = true;
                    if (checklist.id) {
                        await this.update(checklist);
                    } else {
                        await this.create(checklist);
                    }
                    this.close();
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async create(form) {
                await this.$api.checklist.create({
                    ...form,
                });
                this.$message.success('Thêm checklist thành công');
            },

            async update(form) {
                await this.$api.checklist.update(form.id, {
                    ...form,
                });
                this.$message.success('Cập nhật checklist thành công');
            },

        },
    };
</script>
