<template>
    <div>
        <a-table
            class="ant-table-custom !pt-[24px] "
            :data-source="listnews"
            :loading="loading"
            row-key="id"
        >
            <a-table-column
                key="index"
                title="STT"
                :width="60"
                :align="center"
                :custom-render="getIndex"
            />

            <a-table-column
                key="title"
                title="Tiêu đề bài viết"
                data-index="title"
                class="font-light"
                :width="200"
                :align="center"
            />
            <a-table-column
                key="isHighlight"
                title="Nổi bật"
                data-index="isHighlight"
                class="font-light"
                :width="120"
                :align="center"
            >
                <template #default="isHighlight">
                    <span v-if="isHighlight"><i class="fas fa-star text-yellow-400" /></span>
                </template>
            </a-table-column>
            <a-table-column
                key="newsCategoryName"
                title="Danh mục"
                data-index="newsCategoryName"
                class="font-light"
                :width="120"
                :align="center"
            />
            <a-table-column
                key="createdAt"
                title="Ngày tạo"
                data-index="createdAt"
                :width="120"
                :align="center"
                class="font-light"
            >
                <template #default="createdAt">
                    <span>{{ createdAt | dateFormat }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="publicAt"
                title="Xuất bản"
                data-index="publicAt"
                :width="120"
                :align="center"
                class="font-light"
            >
                <template #default="publicAt">
                    <span>{{ publicAt | dateFormat }}</span>
                </template>
            </a-table-column>

            <a-table-column
                key="status"
                title="Trạng thái"
                data-index="status"
                class="font-light"
                :width="80"
                :align="center"
            >
                <template #default="status">
                    <div v-if="status===NEWS_STATUS.ACTIVE">
                        <a-tag class="!w-36" color="green">
                            Đang hoạt động
                        </a-tag>
                    </div>
                    <div v-else-if="status===NEWS_STATUS.INACTIVE">
                        <a-tag class="!w-36" color="red">
                            Đã ẩn
                        </a-tag>
                    </div>
                    <div v-else>
                        <a-tag class="!w-36" color="orange">
                            Bản nháp
                        </a-tag>
                    </div>
                </template>
            </a-table-column>
            <a-table-column
                key="actions"
                :align="center"
                :width="80"
            >
                <template #default="newsCategory">
                    <a-popover placement="bottomRight">
                        <template slot="content" trigger="click">
                            <div class="action-popover" @click="handleEdit(newsCategory)">
                                Chỉnh sửa
                            </div>

                            <div class="action-popover1" @click="handleDelete(newsCategory)">
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
    </div>
</template>
<script>
    import { NEWS_STATUS } from '@/constants/news/news';

    export default {
        props: {
            listnews: {
                type: Array,
            },
            loading: {
                type: Boolean,
            },
        },
        data() {
            return {
                center: 'center',
                NEWS_STATUS,
            };
        },
        mounted() {
            console.log(this.listnews);
        },

        methods: {
            handleEdit(newsCategory) {
                this.$emit('handleEdit', newsCategory);
            },
            handleDelete(id) {
                this.$emit('handleDelete', id);
            },
        },

    };
</script>
<style>
.action-popover{
    width: 168px;
height: 34px;
background: #FFFFFF;
display: flex;
    align-items: center;
}
i.fas.fa-star.text-yellow-400 {
    color: #FFD70F;
}
.action-popover1{
    width: 168px;
height: 34px;
    display: flex;
    align-items: center;
color:#F56C6C;
background: #FFFFFF;
}
</style>
