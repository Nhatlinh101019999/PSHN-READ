<template>
    <div class="table-multiple-choice relative">
        <a-table
            :data-source="dataSoucre"
            :pagination="false"
            :columns="columns"
            :scroll="{ x: 1000 }"
            :row-key="row => row.id"
        >
            <div
                :key="index"
                slot="index"
                slot-scope="scope, record, index"
                class="text-center"
            >
                {{ index + 1 }}
            </div>
            <div slot="choices" slot-scope="scope">
                <li
                    v-for="(items, key) in scope"
                    :key="key"
                    class="multiple-choice mb-2"
                >
                    {{ alphabet[key] + '.  ' + items.content }}
                </li>
            </div>
            <div slot="status" slot-scope="scope">
                <a-tag :color="scope === 'active' ? 'green':'red'" class="w-full">
                    {{ scope === 'active' ? 'Hoạt động':'Ngưng hoạt động' }}
                </a-tag>
            </div>
            <div slot="type" slot-scope="scope">
                {{ scope === 'multipleChoice' ? 'Chọn nhiều':'Chọn một' }}
            </div>
            <template slot="operation" slot-scope="scope, record">
                <div class="bg-transparent flex justify-center items-center gap-3">
                    <a-dropdown placement="bottomRight" :trigger="['click']">
                        <a class="ant-dropdown-link">
                            <a-icon type="more" :rotate="90" />
                        </a>
                        <a-menu slot="overlay" class="w-40">
                            <a-menu-item key="0">
                                <nuxt-link :to="`/utilities/questions/${record.id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item key="1" @click="changeStatusQuestion(record)">
                                {{ record.status === 'active' ? 'Ngưng hoạt động':'Hoạt động' }}
                            </a-menu-item>
                            <a-menu-item key="2" @click="handleRemoveQuestion(record)">
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import _cloneDeep from 'lodash/cloneDeep';

    const columns = [
        {
            title: 'STT',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'index' },
        },
        {
            title: 'Câu hỏi',
            dataIndex: 'title',
            width: 220,
        },
        {
            title: 'Nội dung',
            dataIndex: 'choices',
            width: 260,
            scopedSlots: { customRender: 'choices' },
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            width: 140,
            align: 'center',
            scopedSlots: { customRender: 'type' },
        },
        {
            title: 'Danh mục',
            dataIndex: 'questionCategoryName',
            width: 120,
        },
        {
            title: 'Trạng thái',
            align: 'center',
            dataIndex: 'status',
            width: 120,
            scopedSlots: { customRender: 'status' },
        },
        {
            dataIndex: 'operation',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    export default {
        data() {
            return {
                columns,
                alphabet,
            };
        },
        computed: {
            ...mapState('questions', ['questions']),
            dataSoucre() {
                return _cloneDeep(this.questions);
            },
        },
        methods: {
            handleRemoveQuestion(value) {
                this.$emit('removeQuestion', value);
            },
            changeStatusQuestion(value) {
                this.$emit('changeStatus', value);
            },
        },
    };
</script>
<style lang="scss">
.table-multiple-choice {
    .ant-table-row {
        @apply h-14;
    }
    th.ant-table-row-cell-break-word {
        @apply h-16 bg-green-0 #{!important};
    }
    .ant-table-column-title {
        @apply text-black;
    }
    .ant-dropdown .ant-dropdown-menu-item {
        @apply py-1 h-4;
    }
    .ant-dropdown-link {
        i {
            @apply text-xl p-1;
        }
    }
}
</style>
