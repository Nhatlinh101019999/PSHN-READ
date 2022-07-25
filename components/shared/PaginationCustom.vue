<template>
    <div class="pagination-custom flex items-center justify-between mt-8">
        <div>
            <span>Tổng: {{ total }}</span>
            <span class="ml-3 bg-white px-3 py-2 border-[1px] border-solid border-success-80 rounded-sm">{{ perPage }} / Trang</span>
        </div>
        <div class="flex gap-x-5 items-center">
            <a-pagination
                v-model="countPage"
                class="the-pagination"
                :total="total"
                :page-size="perPage"
                @change="handleChange"
            />
            <div>
                Đi tới trang:
                <a-input-number
                    v-model="countPage"
                    :min="1"
                    :max="+maxPage"
                    @change="handleChange"
                />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            total: {
                type: Number, String,
            },
            perPage: {
                type: Number,
                String,
                default: 12,
            },
            page: {
                type: Number,
                String,
                default: 1,
            },
        },
        data() {
            return {
                maxPage: this.total % this.perPage === 0 ? this.total / this.perPage : Math.floor(this.total / this.perPage) + 1,
                countPage: +this.page,
            };
        },
        computed: {
        },
        methods: {
            async handleChange(e) {
                this.$emit('handlePagination', { page: e });
            },
        },
    };
</script>
<style lang="scss">
    .pagination-custom {
        .ant-pagination-item-link {
            @apply border-0 bg-transparent;
        }
        .ant-pagination-item {
            @apply rounded-full border-transparent;
            &.ant-pagination-item-active {
                @apply bg-success-100;
            }
        }
    }
</style>
