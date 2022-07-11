<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        class="login-form space-y-4"
    >
        <a-form-model-item prop="username" label="Tài khoản" class="font-semibold">
            <a-input
                v-model="form.username"
                size="large"
                placeholder="Nhập tên tài khoản"
                @keyup.native.enter="handleSubmit"
            />
        </a-form-model-item>
        <a-form-model-item prop="password" label="Mật khẩu" class="font-semibold">
            <a-input-password
                v-model="form.password"
                size="large"
                placeholder="Nhập mật khẩu"
                @keyup.native.enter="handleSubmit"
            />
        </a-form-model-item>
        <div class="flex justify-between">
            <a-checkbox @change="onChange">
                Nhớ mật khẩu
            </a-checkbox>
            <nuxt-link class="hover:!text-green-100 !underline hover:underline-offset-2" to="login/forgot-password">
                Quên mật khẩu?
            </nuxt-link>
        </div>
        <a-button
            :loading="loading"
            type="primary"
            size="large"
            class="w-full !bg-gradient-to-tr from-green-10 to-green-20 !border-none !rounded-sm"
            @click="handleSubmit"
        >
            Xác nhận
        </a-button>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';

    const defaultForm = {
        username: '',
        password: '',
    };

    export default {
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                form: _cloneDeep(defaultForm),
                rules: {
                    username: [
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu',
                            trigger: 'blur',
                        },
                    ],
                },
            };
        },

        methods: {
            handleSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
            onChange() {},
        },
    };
</script>
