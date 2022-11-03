<template>
    <div>
        <a-modal
            :footer="false"
            :visible="visible"
            width="500px"
            :closable="false"
        >
            <div class="flex justify-between">
                <div class="font-semibold title">
                    {{ category ? "Chỉnh sửa danh mục" :'Tạo danh mục mới' }}
                </div>
                <div class="cursor-pointer" @click="close">
                    <i class="fas fa-times-circle text-xl" />
                </div>
            </div>
            <Form ref="handleSubmit" :category="category" @submit="handleSubmit" />
            <a-button type="primary" @click="$refs.handleSubmit.submit()">
                {{ category ? 'cập nhật' : 'Tạo mới' }}
            </a-button>
        </a-modal>
    </div>
</template>

<script>
    import Form from './Form.vue';

    export default {
        components: { Form },
        data() {
            return {
                visible: false,
                category: null,
            };
        },
        methods: {
            open(category) {
                if (category) {
                    this.category = category;
                }
                this.visible = true;
            },
            close() {
                this.visible = false;
            },
            async handleSubmit(form) {
                try {
                    if (this.category.id) {
                        await this.update(form);
                    } else {
                        await this.create(form);
                    }
                    await this.$nuxt.refresh();
                    await this.close();
                } catch (error) {
                    this.$handleError(error);
                }
            },
            async create(form) {
                await this.$api.newsCategories.create({ ...form });
                await this.$message.success('Bạn đã tạo danh mục thành công');
            },
            async update(form) {
                await this.$api.newsCategories.update(form.id, { ...form });
                await this.$message.success('Bạn đã cập nhật danh mục thành công');
            },
        },
    };
</script>

<style>

</style>
