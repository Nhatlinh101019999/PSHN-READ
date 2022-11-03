<template>
    <div class="questions-box">
        <div class="mt-2.5 border-b-[1px] border-solid border-gray-40 pb-10">
            <div class="font-bold title">
                Xem thông tin bệnh nhân
            </div>
        </div>
        <Form :question="detailPatient" :disabled="true" />
        <!-- <div class="text-right">
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
                Cập nhật thông tin
            </a-button>
        </div> -->
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Form from '../../../components/patient/Form.vue';

    export default {
        components: { Form },
        async asyncData({ store, params }) {
            await store.dispatch('patient/fetchDetailPatients', params?.id);
        },
        computed: {
            ...mapState('patient', ['detailPatient']),
        },
    };
</script>

<style>

</style>
