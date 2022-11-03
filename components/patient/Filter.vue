<template>
    <div class="questions-filter grid grid-cols-4 gap-x-5 bg-white p-6 rounded-md my-8">
        <div class="col-span-2">
            <span class="block mb-2">Tìm kiếm</span>
            <Search size="large" />
        </div>
        <div>
            <span class="block mb-2">Trạng thái</span>
            <Select
                query="disabled"
                :options="statusOption"
                size="large"
                placeholder="Vui lòng chọn"
            />
        </div>
        <div>
            <span class="block mb-2">Giới tính</span>
            <Select
                query="gender"
                :options="genderOption"
                size="large"
                placeholder="Vui lòng chọn"
            />
        </div>
    </div>
</template>
<script>
    import Search from '@/components/filters/Search.vue';
    import Select from '@/components/filters/Select.vue';
    import { PATIENT_GENDER_OPTIONS, PATIENT_STATUS_OPTIONS } from '@/constants/patient/patient';

    export default {
        components: {
            Search,
            Select,
        },
        computed: {

            statusOption() {
                return PATIENT_STATUS_OPTIONS;
            },
            genderOption() {
                return PATIENT_GENDER_OPTIONS;
            },

        },
    };
</script>
<style lang="scss">
.questions-filter {
    .ant-input-search {
        .ant-input {
            @apply rounded-br-none rounded-tr-none #{!important};
        }
    }
}
</style>
