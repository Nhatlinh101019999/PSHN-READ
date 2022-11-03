<template>
    <div>
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-1 mb-5 gap-3">
                <a-form-model-item v-if="!edit" label="Tiêu đề chechlist" prop="name">
                    <a-input v-model="form.name" placeholder="Nhập tên bệnh viện" />
                </a-form-model-item>
            </div>
            <div class="grid grid-cols-1 mb-5 gap-3">
                <a-form-model-item label="Danh sách checklist" prop="name">
                    <div v-for="(content, index) in form.options" :key="index">
                        <a-input v-model="content.content" :disabled="edit" placeholder="Nhập tên bệnh viện" />
                        <i v-if="!edit" class="fas fa-trash bg-red-50 rounded-md cursor-pointer text-red-100 mx-3 p-3 text-center" @click="form.options.splice(i,1)" />
                    </div>
                    <a-button
                        v-if="!edit"
                        type="primary"
                        ghost
                        class="my-2"
                        :loading="loading"
                        @click="handleAdd"
                    >
                        <i class="fas fa-plus-circle mr-1" /> Thêm việc cần làm
                    </a-button>
                </a-form-model-item>
            </div>
        </a-form-model>
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _isEmpty from 'lodash/isEmpty';

    const defaultForm = {
        name: '',
        options: [
            {
                content: '',
            },
            {
                content: '',
            },
        ],
    };
    const defaultOption = {
        content: '',
    };

    export default {
        props: {
            checklist: {
                type: Object,
            },
            edit: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
            },

        },
        data() {
            return {
                form: !_isEmpty(this.checklist) ? _cloneDeep(this.checklist) : _cloneDeep(defaultForm),
                rules: {
                    name: [{
                        required: true,
                        message: 'Không được để trống mục này',
                        trigger: 'change',
                    }],
                },
            };
        },
        // watch: {
        //     checklist() {
        //         this.form = !_isEmpty(this.checklist) ? _cloneDeep(this.checklist) : _cloneDeep(defaultForm);
        //     },
        // },

        mounted() {
            console.log(this.checklist);
        },
        methods: {
            handleAdd() {
                this.form.options.push(_cloneDeep(defaultOption));
            },
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },

    };
</script>

<style>

</style>
