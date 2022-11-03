<template>
    <div>
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <a-form-model-item label="Ảnh bìa" prop="thumbnail">
                        <a-upload
                            name="avatar"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            :before-upload="beforeUpload"
                            @change="handleChange"
                        >
                            <img v-if="imageUrl" :src="imageUrl" alt="avatar">
                            <div v-else>
                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                <div class="ant-upload-text">
                                    Tải ảnh lên
                                </div>
                            </div>
                        </a-upload>
                    </a-form-model-item>
                </div>
                <div>
                    <a-form-model-item label="Tên danh mục" prop="title">
                        <a-input v-model="form.title" class="!mt-4" placeholder="Vui lòng nhập" />
                    </a-form-model-item>
                </div>
                <div>
                    <a-form-model-item label="Danh mục tin tức" prop="newsCategoryId">
                        <!-- <SelectRemote
                            v-model="form.newsCategoryId"
                            fetch-url="questionCategories/fetchQuestionCategories"
                            option-label="name"
                            option-value="id"
                            store="questionCategories"
                            class="!mt-4"
                            store-prop="questionCategories"
                            size="large"
                            placeholder="Mời chọn danh mục"
                        /> -->
                        <SelectRemote
                            v-model="form.newsCategoryId"
                            fetch-url="newsCategories/fetchCategory"
                            option-label="name"
                            option-value="id"
                            store="newsCategories"
                            class="!mt-4"
                            store-prop="newsCategory"
                            size="large"
                            placeholder="Mời chọn danh mục"
                        />
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    const defaultForm = {
        thumbnail: '',
        title: '',
        content: '',
        newsCategoryId: null,

    };

    export default {
        components: {
            SelectRemote,
        },
        data() {
            return {
                form: this.question ? _cloneDeep(this.question) : _cloneDeep(defaultForm),
                rules: {
                    thumbnail: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    title: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    newsCategoryId: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    content: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                },
            };
        },
        methods: {
            handleContentChange(content) {
                this.form.content = content;
            },

        },
    };
</script>

<style>

</style>
