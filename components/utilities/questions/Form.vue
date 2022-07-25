<template>
    <div class="question-form">
        <div class="bg-white p-7 rounded-md my-8">
            <a-form-model
                ref="form"
                :model="form"
                :rules="rules"
            >
                <div class="grid grid-cols-3 mb-5 gap-3">
                    <span>
                        <a-form-model-item label="Loại câu hỏi" prop="type">
                            <a-radio-group v-model="dataForm.type">
                                <a-radio value="singleChoice">
                                    Chọn một
                                </a-radio>
                                <a-radio value="multipleChoice">
                                    Chọn nhiều
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                    </span>
                    <span class="col-span-2">
                        <a-form-model-item label="Trạng thái" prop="status">
                            <a-select v-model="dataForm.status" size="large" placeholder="Mời chọn trạng thái">
                                <a-select-option v-for="item in statusConstant" :key="item.value" :value="item.value">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </span>
                </div>
                <div class="mb-5">
                    <a-form-model-item label="Danh mục" prop="questionCategoryId">
                        <SelectRemote
                            v-model="dataForm.questionCategoryId"
                            fetch-url="questionCategories/fetchQuestionCategories"
                            option-label="name"
                            option-value="id"
                            store="questionCategories"
                            store-prop="questionCategories"
                            size="large"
                            placeholder="Mời chọn danh mục"
                        />
                    </a-form-model-item>
                </div>
                <div class="mb-5">
                    <a-form-model-item label="Câu hỏi" prop="title">
                        <a-input v-model="dataForm.title" placeholder="Vui lòng nhập" size="large" />
                    </a-form-model-item>
                </div>
                <div class="controler-question mb-5">
                    <a-form-model-item label="Đáp án">
                        <a-radio-group v-if="dataForm.type === 'singleChoice'" v-model="checked" class="w-full">
                            <div
                                v-for="(item, index) in dataForm.choices"
                                :key="index"
                                class="flex items-center gap-x-5 mb-7"
                            >
                                <a-radio :value="item.id ? item.id : index" @focus="isAnwserQuestion(index)" />
                                <a-form-model-item
                                    class="w-full"
                                    :prop="'choices.' + index + '.content'"
                                    :rules="{
                                        required: true,
                                        message: 'Không được để trống trường này',
                                        trigger: 'blur',
                                    }"
                                >
                                    <a-input
                                        v-model="item.content"
                                        placeholder="Vui lòng nhập"
                                        size="large"
                                    />
                                </a-form-model-item>
                                <a-button type="link" @click="handleRemoveQuestion(item.id, index)">
                                    <i class="fas fa-trash" />
                                </a-button>
                            </div>
                        </a-radio-group>
                        <div v-else>
                            <div
                                v-for="(item, index) in dataForm.choices"
                                :key="index"
                                class="flex items-center gap-x-5 mb-7"
                            >
                                <a-checkbox v-model="item.isCorrect" :value="index" />
                                <a-form-model-item
                                    class="w-full"
                                    :prop="'choices.' + index + '.content'"
                                    :rules="{
                                        required: true,
                                        message: 'Không được để trống trường này',
                                        trigger: 'blur',
                                    }"
                                >
                                    <a-input
                                        v-model="item.content"
                                        placeholder="Vui lòng nhập"
                                        size="large"
                                    />
                                </a-form-model-item>
                                <a-button type="link" @click="handleRemoveQuestion(item.id, index)">
                                    <i class="fas fa-trash" />
                                </a-button>
                            </div>
                        </div>
                    </a-form-model-item>
                    <a-button
                        type="primary"
                        class="title-button custome-btn ml-9"
                        @click="addQuestionItem"
                    >
                        <i class="fas fa-plus-circle mr-2.5 " />
                        Thêm đáp án
                    </a-button>
                </div>
                <div>
                    <a-form-model-item label="Bổ trợ đáp án" prop="answerExplanation">
                        <a-textarea v-model="dataForm.answerExplanation" :auto-size="{ minRows: 5}" placeholder="Chú thích" />
                    </a-form-model-item>
                </div>
            </a-form-model>
        </div>
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import { QUESTIONS_STATUS_OPTIONS } from '@/constants/questions/question';
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    const defaultForm = {
        id: null,
        answerExplanation: '',
        choices: [
            {
                content: '',
                isCorrect: true,
            },
        ],
        questionCategoryId: 1,
        status: 'active',
        title: '',
        type: 'multipleChoice', // singleChoice
    };
    export default {
        components: {
            SelectRemote,
        },
        props: {
            question: Object,
        },
        data() {
            return {
                form: this.question ? _cloneDeep(this.question) : _cloneDeep(defaultForm),
                rules: {
                    answerExplanation: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    questionCategoryId: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    status: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    title: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    type: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    content: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                },
                checked: null,
            };
        },
        computed: {
            statusConstant() {
                return QUESTIONS_STATUS_OPTIONS;
            },
            dataForm() {
                return this.form;
            },
            isCorrect() {
                return this.form.choices.find((item) => item.isCorrect === true);
            },
        },
        watch: {
            question() {
                this.form = this.question ? _cloneDeep(this.question) : _cloneDeep(defaultForm);
            },
        },
        mounted() {
            this.checked = this.isCorrect?.id || null;
        },
        methods: {
            addQuestionItem() {
                const newData = {
                    content: '',
                    isCorrect: false,
                };
                this.form.choices.unshift(newData);
            },
            async isAnwserQuestion(value) {
                this.form.choices = this.form.choices.map((item) => ({ ...item, isCorrect: false }));
                this.form.choices[value].isCorrect = true;
            },
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.dataForm);
                    }
                });
            },
            handleRemoveQuestion(id, key) {
                if (id) {
                    this.form.choices = this.form.choices.filter((item) => item.id !== id);
                } else {
                    this.form.choices = this.form.choices.filter((item, index) => index !== key);
                }
            },
        },
    };
</script>
<style lang="scss">
.question-form {
    .transperant-btn {
        @apply bg-transparent text-green-20 border-green-20 #{!important};
    }
    .ant-form-item-label {
        @apply mb-3
    }
    .custome-btn {
        @apply bg-green-0 text-green-1 #{!important};
    }
    .ant-radio-wrapper {
        @apply m-0;
    }
    .ant-input-search {
        .ant-input {
            @apply rounded-br-none rounded-tr-none #{!important};
        }
    }
    .ant-form-explain {
        @apply absolute -bottom-6;
    }
    .controler-question {
        @apply relative
    }
}
</style>
