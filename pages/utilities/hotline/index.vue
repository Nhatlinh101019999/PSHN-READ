<template>
    <div>
        <div class="flex justify-between items-center">
            <h3>Hotline</h3>
            <a-button type="primary" @click="handleAdd">
                <i class="fas fa-plus p-2 rounded-full text-white" />
                Thêm hotline
            </a-button>
        </div>
        <a-divider class=" !w-full !h-0.5 !mx-0 !my-6" type="vertical" />
        <div v-for="(hotline, index) in hotline" :key="index">
            <Form :hotline="hotline" />
        </div>
        <DialogDelete ref="deleteHotline" />
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    import Form from '@/components/utilities/hotline/Form.vue';
    import DialogDelete from '../../../components/utilities/hotline/DialogDelete.vue';

    export default {
        components: { Form, DialogDelete },
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapState('hotline', ['hotline']),
        },
        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('hotline/fetchHotline');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            handleAdd() {
                this.$store.commit('hotline/ADD_HOTLINE');
                console.log(this.hotline);
            },

        },
    };
</script>

<style>

</style>
