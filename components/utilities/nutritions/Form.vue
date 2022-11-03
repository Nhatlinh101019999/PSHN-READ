<template>
    <a-form-model
        ref="form"
        :model="form"
        layout="horizontal"
        :colon="false"
        :rules="rules"
    >
        <div class="grid gap-y-4">
            <a-form-model-item label="Tên danh mục" prop="name">
                <a-input v-model="form.name" class="!mt-4" placeholder="Vui lòng nhập" />
            </a-form-model-item>
            <a-form-model-item class="gap-y-4 font-light text-base" label="Ảnh đại diện" prop="thumbnail">
                <a-upload
                    name="avatar"
                    list-type="picture-card"
                    :before-upload="beforeUpload"
                    :show-upload-list="false"
                    class="avatar-uploader !mt-4 "
                    @change="handleChange"
                >
                    <img
                        v-if="form.thumbnail"
                        class="!h-full !w-full rounded-2xl "
                        :src="form.thumbnail"
                        alt="avatar"
                    >
                    <div v-else>
                        <a-icon class="icon-plus" :type="loading ? 'loading' : 'plus'" />
                        <div class="mt-2.5">
                            Tải ảnh lên
                        </div>
                    </div>
                </a-upload>
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import { IMAGE_SIZE_LIMIT, IMAGE_FILE_TYPE } from '@/configs/upload';

    const defaultForm = {
        name: '',
        thumbnail: '',
    };

    export default {
        props: {
            nutrition: Object,
        },
        data() {
            return {
                loading: false,
                imageUrl: '',
                form: null,
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'change' },
                    ],
                },
            };
        },
        watch: {
            nutrition: {
                handler(val) {
                    this.form = val ? _cloneDeep({ name: val.name, thumbnail: val.thumbnail }) : _cloneDeep(defaultForm);
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            async handleChange(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    console.log(info);
                    return;
                }
                if (info.file.status === 'done') {
                    const data = new FormData();
                    data.append('files', info.file.originFileObj);
                    const response = await this.$api.uploads.uploadImage(data);
                    const imageUrl = response.data.links[0].source;
                    this.form.thumbnail = `${process.env.IMAGE_BASE_URL}/${imageUrl}`;
                    this.loading = false;
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = IMAGE_FILE_TYPE;
                if (!isJpgOrPng) {
                    this.$message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size < IMAGE_SIZE_LIMIT;
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!');
                }
                return isJpgOrPng && isLt2M;
            },
            handleAddNutrition() {
                this.$emit('handleCancle');
            },
            resetForm() {
                this.form = _cloneDeep(defaultForm);
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
