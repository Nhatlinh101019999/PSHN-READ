<template>
    <div class="flex flex-row justify-between items-center pb-6">
        <div class=" flex items-center ">
            <a-popover placement="bottomLeft">
                <template slot="content" trigger="click">
                    <div class="w-60 cursor-pointer action-button" @click="handleEdit(nutrition)">
                        Chỉnh sửa
                    </div>
                    <div class="mt-3 cursor-pointer action-button" @click="handleDelete(nutrition.id)">
                        Xóa
                    </div>
                </template>
                <div class=" cursor-pointer">
                    ...
                </div>
            </a-popover>
            <img class="w-[60px] h-[60px] rounded-xl mx-4 image-item" :src="nutrition.thumbnail || '/images/default.jpg'">
            <div class="font-semibold text-base ">
                {{ nutrition.name }}
            </div>
        </div>
        <div class="w-40">
            Ngày tạo: {{ nutrition.createdAt | dateFormat }}
        </div>
    </div>
</template>
<script>

    export default {
        props: {
            nutrition: {
                type: Object,
            },
        },
        methods: {
            handleEdit(nutrition) {
                this.$emit('handleEdit', nutrition);
            },
            handleDelete(id) {
                this.$emit('handleDelete', id);
            },
        },
    };
</script>
<style lang="scss" scoped>
::v-deep {
.ant-popover {
    z-index: 1 !important;
}

}
.action-button{
 &:hover {
      color: #F56C6C;
    }
}
.image-item {
    border: 1px solid;
    border-color: gray
}
</style>
