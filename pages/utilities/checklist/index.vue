<template>
    <div>
        <div class="flex justify-between mt-2.5">
            <div class="font-semibold text-2xl title">
                Checklist
            </div>
            <a-button
                type="primary"
                class=" bg-button title-button"
                @click="handleAdd"
            >
                <i class="fas fa-plus-circle mr-2.5 " />
                Thêm checklist
            </a-button>
        </div>
        <a-collapse v-for="(item,index) in checklist" :key="index" accordion>
            <a-collapse-panel :header="item.name">
                <div class="ml-5">
                    <FormChecklist :checklist="item" :edit="true" />
                </div>
                <div slot="extra">
                    <span class="text-orange-100 p-2" @click="handleActive(item)">
                        {{ CHECKLIST_STATUS_LABELS[item.status] }}
                    </span>
                    <span class="text-prim-100 p-2" @click="handleEdit(item)">Chỉnh sửa</span>
                    <span class="text-red-100 p-2" @click="handleDelete(item)">Xóa</span>
                </div>
            </a-collapse-panel>
        </a-collapse>
        <DeleteChecklist ref="handleDlete" />
        <Dialog ref="handleEdit" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import { CHECKLIST_STATUS, CHECKLIST_STATUS_OPTIONS } from '@/constants/checklist/checklist';
    import FormChecklist from '../../../components/utilities/checklist/Form.vue';
    import DeleteChecklist from '../../../components/utilities/checklist/DeleteChecklist.vue';
    import Dialog from '../../../components/utilities/checklist/Dialog.vue';

    export default {
        components: { FormChecklist, DeleteChecklist, Dialog },
        async fetch() {
            await this.fetchData();
        },
        computed: {
            ...mapState('checklist', ['checklist']),
            CHECKLIST_STATUS_LABELS() {
                return mapDataFromOptions(CHECKLIST_STATUS_OPTIONS, 'value', 'label');
            },
        },
        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('checklist/fetchChecklist');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            async handleActive(item) {
                try {
                    this.loading = true;
                    if (item.status === CHECKLIST_STATUS.ACTIVE) {
                        await this.$api.checklist.inactive(item.id);
                        this.$message.success(`Ẩn checklist ${item.name} thành công !!!`);
                    } else {
                        await this.$api.checklist.active(item.id);
                        this.$message.success(`Hiển thị checklist ${item.name} thành công !!!`);
                    }
                    this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            handleDelete(item) {
                this.$refs.handleDlete.open(item);
            },
            handleEdit(item) {
                this.$refs.handleEdit.open(item);
            },
            handleAdd() {
                this.$refs.handleEdit.open();
            },

        },
    };
</script>

<style>

</style>
