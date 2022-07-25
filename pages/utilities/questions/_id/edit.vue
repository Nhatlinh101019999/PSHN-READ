<template>
    <div class="questions-box">
        <div class="mt-2.5 border-b-[1px] border-solid border-gray-40 pb-10">
            <div class="font-bold title">
                Chỉnh sửa câu hỏi
            </div>
        </div>
        <Form ref="questionForm" :question="dataSoucre" @submit="editQuestion" />
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
                Cập nhật câu hỏi
            </a-button>
        </div>
    </div>
</template>
<script>
    import Form from '@/components/utilities/questions/Form.vue';
    import { mapState } from 'vuex';

    export default {
        components: {
            Form,
        },
        async asyncData({ store, params }) {
            await store.dispatch('questions/fetchQuestions');
            await store.dispatch('questions/fetchDetailQuestion', params?.id);
        },
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapState('questions', ['detailQuestion']),
            dataSoucre() {
                return this.detailQuestion;
            },
        },
        methods: {
            async editQuestion(form) {
                try {
                    this.loading = true;
                    await this.$api.questions.update(+form.id, {
                        ...form,
                    });
                    this.$message.success('Chỉnh sửa câu hỏi thành công');
                    this.$router.push('/utilities/questions');
                    this.$nuxt.refresh();
                } catch {
                    this.$message.error('Chỉnh sửa câu hỏi thất bại');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
