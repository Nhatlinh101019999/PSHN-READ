<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="checklist ? 'Xóa địa chỉ của ' + checklist.name : 'Xóa địa chỉ'"
    >
        <div>Xác nhận xóa checklist</div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28 !rounded-md" @click="handleCancel">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28 !bg-gradient-to-tr from-green-10 to-green-20 !border-none !rounded-md"
                type="primary"
                @click="handleDelete"
            >
                Xác nhận
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    export default {

        data() {
            return {
                visible: false,
                loading: false,
                checklist: null,
            };
        },

        methods: {
            open(checklist) {
                this.checklist = checklist;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleDelete() {
                await this.$emit('confirm');
                this.close();
                try {
                    this.loading = true;
                    await this.$api.checklist.delete(this.checklist.id);
                    this.$message.success('Xóa địa chỉ thành công ');
                    this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            handleCancel() {
                this.close();
                this.checklist = null;
            },
        },
    };
</script>
