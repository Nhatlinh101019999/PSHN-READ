<template>
    <div>
        <div v-if="edit" class="flex justify-end">
            <button type="bule" class="m-4" @click="()=>{edit=false}">
                Chỉnh sửa
            </button>
            <button type="red" class="m-4" @click="$refs.deleteHotline.open(form)">
                Xóa
            </button>
        </div>
        <div v-else class="flex justify-end">
            <button @click="submit">
                Cập nhật
            </button>
        </div>
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class=" mb-5 gap-3">
                <a-form-model-item label="Tiêu đề" prop="title">
                    <a-input v-model="form.title" :disabled="edit" placeholder="Nhập tên tiêu đề" />
                </a-form-model-item>
            </div>
            <div v-for="(option, index) in form.children" :key="index" class=" ">
                <div class=" gap-x-3 gap-y-5 items-center mb-5 grid grid-cols-2">
                    <a-form-model-item
                        class="w-full"
                        :prop="'children.' + index + '.title'"
                        :rules="{
                            required: true,
                            message: 'Không được để trống trường này',
                            trigger: 'blur',
                        }"
                    >
                        <a-input
                            v-model="option.title"
                            placeholder="Vui lòng nhập"
                            size="large"
                            :disabled="edit"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        class="w-full"
                        :prop="'children.' + index + '.phone'"
                        :rules="{
                            required: true,
                            message: 'Không được để trống trường này',
                            trigger: 'blur',
                        }"
                    >
                        <a-input
                            v-model="option.phone"
                            placeholder="Vui lòng nhập"
                            size="large"
                            :disabled="edit"
                        />
                    </a-form-model-item>
                </div>
                <div v-if="!edit">
                    <i class="fas fa-trash bg-red-50 rounded-md cursor-pointer text-red-100 mx-3 p-3  text-center" @click="form.children.splice(index,1)" />
                </div>
            </div>
            <a-button
                v-if="!edit"
                type="primary"
                class="title-button custome-btn "
                @click="addHotlineItem"
            >
                <i class="fas fa-plus-circle mr-2.5 " />
                Thêm đáp án
            </a-button>
        </a-form-model>
        <DialogDelete ref="deleteHotline" />
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _isEmpty from 'lodash/isEmpty';
    import DialogDelete from './DialogDelete.vue';

    const defaultForm = {
        title: '',
        children: [
            {
                title: '',
                phone: '',
            },
        ],

    };
    export default {
        components: { DialogDelete },
        props: {
            hotline: {
                type: Object,
            },
        },
        data() {
            return {
                form: !_isEmpty(this.hotline) ? _cloneDeep(this.hotline) : _cloneDeep(defaultForm),
                edit: !_isEmpty(this.hotline.title),
                rules: {
                    title: [{
                        required: true,
                        message: 'Không được để trống mục này',
                        trigger: 'change',
                    }],
                },
            };
        },
        // watch: {
        //     hotline() {
        //         this.form = !_isEmpty(this.hotline) ? _cloneDeep(this.hotline) : _cloneDeep(defaultForm);
        //         // this.edit = (this.form.title !== '');
        //     },
        // },
        methods: {
            addHotlineItem() {
                const newData = {
                    title: '',
                    phone: '',
                };
                this.form.children.push(newData);
            },
            submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        if (this.form.id) {
                            this.update(this.form);
                        } else {
                            this.create(this.form);
                        }
                    }
                });
            },
            async update(form) {
                try {
                    this.loading = true;
                    await this.$api.hotline.update(form.id, form);
                    this.edit = true;
                    this.$nuxt.refresh();
                    this.$message.success('Cập nhật hotline thành công');
                } catch (error) {
                    this.$handerError(error);
                } finally {
                    this.loading = false;
                }
            },
            async create(form) {
                try {
                    this.loading = true;
                    await this.$api.hotline.create(form);
                    this.edit = true;
                    this.$nuxt.refresh();
                    this.$message.success('Tạo mới địa chỉ thành công');
                } catch (error) {
                    this.$handerError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

<style>

</style>
