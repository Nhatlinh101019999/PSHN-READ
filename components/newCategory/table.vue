<template>
    <a-table
        class="ant-table-custom !pt-[24px] "
        :data-source="data"
        :pagination="false"
    >
        <a-table-column
            key="index"
            title="STT"
            :width="60"
            :align="center"
        />
        <a-table-column
            key="name"
            title="Tên danh mục"
            :width="180"
            :align="center"
            data-index="name"
        />
        <a-table-column
            key="totalNews"
            title="Bài viết"
            :width="120"
            :align="center"
            data-index="totalNews"
        />
        <a-table-column
            key="createdAt"
            title="Ngày tạo"
            :width="180"
            :align="center"
            data-index="createdAt"
        >
            <template #default="createdAt">
                <span>{{ createdAt | dateFormat }}</span>
            </template>
        </a-table-column>
        <a-table-column
            key="actions"
            :width="80"
        >
            <template #default="newsCategory">
                <a-popover placement="bottomRight">
                    <template slot="content" trigger="click">
                        <div class="action-popover" @click="handleEdit(newsCategory)">
                            Chỉnh sửa
                        </div>

                        <div class="action-popover" @click="handleDelete(newsCategory)">
                            Xóa
                        </div>
                    </template>
                    <div>
                        ...
                    </div>
                </a-popover>
            </template>
        </a-table-column>
    </a-table>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
            },
        },
        methods: {
            handleDelete(newsCategory) {
                this.$emit('handleDelete', newsCategory);
            },
            handleEdit(newCategory) {
                this.$emit('handleEdit', newCategory);
            },
        },
    };
</script>

<style>

</style>
