<template>
    <div>
        <h3>Địa chỉ</h3>
        <a-divider class=" !w-full !h-0.5 !mx-0 !my-6" type="vertical" />
        <div v-for="(address,index) in address" :key="index">
            <FormAddress :address="address" />
        </div>
        <a-button type="primary" @click="handleAdd">
            <i class="fas fa-plus p-2 rounded-full text-white" />
            Thêm địa chỉ
        </a-button>
    </div>
</template>

<script>
    import FormAddress from '@/components/utilities/addresses/Form.vue';
    import { mapState } from 'vuex';

    export default {
        components: { FormAddress },
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapState('address', ['address']),
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('address/fetchAddress');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            handleAdd() {
                this.$store.commit('address/ADD_ADDRESS');
            },
        },

    };
</script>

<style>

</style>
