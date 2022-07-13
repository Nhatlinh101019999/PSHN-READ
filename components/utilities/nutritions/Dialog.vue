<template>
    <a-modal
        width="450px"
        :mask-closable="false"
        :footer="null"
        :closable="closable"
        :visible="visible"
    >
        <div class="title flex flex-row justify-between items-center h-[30px] mb-4">
            <div class="font-semibold title">
                {{ nutrition ? 'Chỉnh sửa danh mục' : 'Thêm danh mục' }}
            </div>
            <div class="cursor-pointer" @click="close">
                <i class="fas fa-times-circle text-xl" />
            </div>
        </div>
        <NutritionForm ref="nutritionForm" :nutrition="nutrition" @submit="handleSubmit" />
        <a-button
            type="primary"
            size="default"
            class="w-full bg-button !border-none !rounded-md"
            @click="$refs.nutritionForm.submit()"
        >
            {{ nutrition ? 'Cập nhật' : 'Xác nhận' }}
        </a-button>
    </a-modal>
</template>

<script>
    import NutritionForm from '@/components/utilities/nutritions/Form.vue';

    export default {
        components: {
            NutritionForm,
        },
        data() {
            return {
                nutrition: null,
                visible: false,
                loading: false,
                closable: false,
            };
        },
        methods: {
            open(nutrition) {
                if (nutrition) {
                    this.nutrition = nutrition;
                }
                this.visible = true;
            },

            close() {
                this.visible = false;
                this.$refs.nutritionForm.resetForm();
            },
            async handleSubmit(form) {
                try {
                    this.loading = true;
                    if (this.nutrition) {
                        await this.updateNutrition(form);
                    } else {
                        await this.createNutrition(form);
                    }
                    this.close();
                    this.loading = false;
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async createNutrition(form) {
                await this.$api.nutritions.create({
                    ...form,
                });
                this.$message.success('Thêm danh mục dinh dưỡng thành công');
            },

            async updateNutrition(form) {
                await this.$api.nutritions.update(this.nutrition.id, {
                    ...form,
                });
                this.$message.success('Cập nhật danh mục dinh dưỡng thành công');
            },

        },
    };
</script>
