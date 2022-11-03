<template>
    <a-form-model ref="form" :model="form" :rules="rules">
        <a-form-model-item label="Tên danh mục" prop="name">
            <a-input v-model="form.name" type="text" />
        </a-form-model-item>
    </a-form-model>
</template>
   <script>
    import _cloneDeep from 'lodash/cloneDeep';

    const defaultForm = {
        name: '',
    };
    export default {
        props: {
            category: Object,
        },
        data() {
            return {
                form: this.category ? _cloneDeep(this.category) : _cloneDeep(defaultForm),
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'change' },
                    ],
                },
            };
        },
        methods: {
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
