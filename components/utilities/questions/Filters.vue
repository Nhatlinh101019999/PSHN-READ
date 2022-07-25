<template>
    <div class="questions-filter grid grid-cols-5 gap-x-5 bg-white p-6 rounded-md my-8">
        <div class="col-span-2">
            <span class="block mb-2">Tìm kiếm</span>
            <Search size="large" />
        </div>
        <div>
            <span class="block mb-2">Trạng thái</span>
            <Select
                query="status"
                :options="statusOption"
                size="large"
                placeholder="Vui lòng chọn"
            />
        </div>
        <div>
            <span class="block mb-2">Loại câu hỏi</span>
            <Select
                query="type"
                :options="typeOption"
                size="large"
                placeholder="Vui lòng chọn"
            />
        </div>
        <div>
            <span class="block mb-2">Danh mục</span>
            <Select
                query="questionCategoryId"
                :options="categoriesOption"
                option-label="name"
                option-value="id"
                size="large"
                placeholder="Vui lòng chọn"
            />
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import Search from '@/components/filters/Search.vue';
    import Select from '@/components/filters/Select.vue';
    import { QUESTIONS_STATUS_OPTIONS, QUESTIONS_TYPE_OPTIONS } from '@/constants/questions/question';

    export default {
        components: {
            Search,
            Select,
        },
        computed: {
            ...mapState('questionCategories', ['questionCategories']),
            statusOption() {
                return QUESTIONS_STATUS_OPTIONS;
            },
            typeOption() {
                return QUESTIONS_TYPE_OPTIONS;
            },
            categoriesOption() {
                return this.questionCategories;
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
