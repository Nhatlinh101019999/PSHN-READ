<template>
    <div>
        <div class="flex justify-between mt-2.5">
            <div class="font-bold title">
                Danh mục dinh dưỡng
            </div>
            <a-button
                type="primary"
                class=" bg-button title-button"
                @click="handleAdd"
            >
                <i class="fas fa-plus-circle mr-2.5 " />
                Thêm danh mục dinh dưỡng
            </a-button>
        </div>
        <a-divider class=" !w-full !h-0.5 !mx-0 !my-6" type="vertical" />
        <div>
            <div v-for="nutrition in nutritions" :key="nutrition.id">
                <NutrionItem :nutrition="nutrition" @handleEdit="handleEdit" @handleDelete="openConfirmDeleteDialog" />
            </div>
        </div>
        <NutrionDialog ref="nutrionDialog" />
        <ConfirmDialog
            ref="confirmDilalog"
            content="Bạn có chắc chắn xóa không?"
            @confirm="handleDelete"
            @cancle="handleCancleCorfirm"
        />
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import NutrionItem from '@/components/utilities/nutritions/Item.vue';
    import NutrionDialog from '@/components/utilities/nutritions/Dialog.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        components: {
            NutrionItem,
            NutrionDialog,
            ConfirmDialog,
        },
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                visibleConfirmDialog: false,
                currentNutritionId: null,
            };
        },
        computed: {
            ...mapState('nutritions', ['nutritions']),
        },
        mounted() {

        },
        methods: {

            ...mapActions('nutritions', ['deleteNutrition']),
            handleAdd() {
                this.$refs.nutrionDialog.open(this.nutrition);
            },
            handleEdit(nutrition) {
                this.$refs.nutrionDialog.open(nutrition);
            },
            async openConfirmDeleteDialog(id) {
                this.currentNutritionId = id;
                this.$refs.confirmDilalog.open();
                this.visibleConfirmDialog = true;
            },
            async handleDelete() {
                if (this.currentNutritionId) {
                    try {
                        await this.$api.nutritions.delete(this.currentNutritionId);
                        this.$message.success('Xóa danh mục dinh dưỡng thành công');
                        await this.$nuxt.refresh();
                    } catch (error) {
                        this.$handleError(error);
                    }
                }
            },
            handleCancleCorfirm() {
                this.visibleConfirmDialog = false;
            },
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('nutritions/fetchNutritions');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
        head() {
            return {
                title: 'Danh sách danh mục dinh dưỡng | PSHN',
            };
        },
    };
</script>
