<template>
    <div class="questions-box">
        <div class="mt-2.5 border-b-[1px] border-solid border-gray-40 pb-10">
            <div class="font-bold title">
                Tạo mới câu hỏi
            </div>
        </div>
        <Form ref="questionForm" @submit="editQuestion" />
        <div class="text-right">
            <a-button
                type="default"
                class="title-button transperant-btn mr-3"
                @click="$router.push('/utilities/questions')"
            >
                Hủy bỏ
            </a-button>
            <a-button
                type="primary"
                class="bg-button title-button"
                :loading="loading"
                @click="$refs.questionForm.submit()"
            >
                Đồng ý
            </a-button>
        </div>
    </div>
</template>
<script>
    import Form from '@/components/utilities/questions/Form.vue';

    export default {
        components: {
            Form,
        },
        data() {
            return {
                loading: false,
            };
        },
        methods: {
            async editQuestion(form) {
                try {
                    this.loading = true;
                    await this.$api.questions.create({
                        ...form,
                    });
                    this.$message.success('Tạo mới câu hỏi thành công');
                    this.$router.push('/utilities/questions');
                    this.$nuxt.refresh();
                } catch {
                    this.$message.error('Tạo mới câu hỏi thất bại');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
