<template>
    <div>
        <div v-if="!verifiedEmailOTP" class="flex flex-col items-center">
            <div class="text-5xl pb-8 font-semibold text-green-100">
                Quên mật khẩu
            </div>
            <a-form-model
                ref="form"
                :model="form"
                :rules="rules"
                class="space-y-4 !mt-3 min-w-[200px] max-w-md w-full"
            >
                <a-form-model-item prop="email" label="Vui lòng nhập Email đã đăng ký để lấy lại mật khẩu">
                    <a-input
                        v-model="form.email"
                        size="large"
                        placeholder="Nhập Email của bạn"
                        @keyup.native.enter="emailValidate"
                    />
                </a-form-model-item>
                <a-form-model-item v-if="otpSent" prop="otp" label="Nhập mã OTP được gửi tới Email của bạn">
                    <a-input
                        v-model="form.otp"
                        size="large"
                        placeholder="Nhập mã"
                        @keyup.native.enter="handleSubmit"
                    />
                </a-form-model-item>
                <div v-if="otpSent" class="flex justify-between">
                    <button class="hover:!text-green-100">
                        <i class="fas fa-undo pr-2" /> Gửi lại mã OTP
                    </button>
                    <button class="hover:!text-green-100 !underline hover:underline-offset-2" @click="changeEmail">
                        Thay đổi Email
                    </button>
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
        </div>
        <div v-if="verifiedEmailOTP" class="flex flex-col items-center">
            <div class="text-5xl pb-8 font-semibold text-green-100">
                Đặt lại mật khẩu
            </div>
            <p>Tạo mật khẩu mới có tối thiểu 6 ký tự. Mật khẩu mạnh là mật khẩu được kết hợp từ các ký tự, số và dấu câu.</p>
            <a-form-model v-model="form.pass" class="space-y-4 !mt-3 min-w-[200px] max-w-md w-full">
                <a-form-model
                    ref="form"
                    :model="form"
                    :rules="rules"
                    v-bind="layout"
                >
                    <a-form-model-item has-feedback label="Nhập mật khẩu mới" prop="password">
                        <a-input-password v-model="form.password" type="password" autocomplete="off" />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Nhập lại mật khẩu mới" prop="checkPass">
                        <a-input-password
                            v-model="form.checkPass"
                            type="password"
                            autocomplete="off"
                            @keyup.native.enter="submitNewPass"
                        />
                    </a-form-model-item>

                    <a-button
                        :loading="loading"
                        type="primary"
                        size="large"
                        class="w-full !mt-6 !bg-gradient-to-tr from-green-10 to-green-20 !border-none !rounded-sm"
                        @click="submitNewPass"
                    >
                        Xác nhận
                    </a-button>
                </a-form-model>
            </a-form-model>
        </div>
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import { passwordValidtor } from '@/utils/form';

    const defaultForm = {
        email: '',
        otp: '',
        password: '',
    };

    export default {
        layout: 'auth',
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            const validateChangedPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Vui lòng nhập lại mật khẩu'));
                } else if (value !== this.form.password) {
                    callback(new Error('Mật khẩu mới không khớp'));
                } else {
                    callback();
                }
            };

            return {
                otpSent: false,
                verifiedEmailOTP: false,
                checkPass: '',
                form: _cloneDeep(defaultForm),
                rules: {
                    email: [
                        {
                            required: true,
                            message: 'Vui lòng nhập Email',
                            trigger: 'blur',
                        },
                        {
                            type: 'email',
                            message: 'Vui lòng nhập đúng định dạng Email',
                            trigger: 'blur',
                        },
                    ],
                    otp: [
                        {
                            required: true,
                            message: 'Vui lòng nhập mã OTP',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới',
                            trigger: 'blur',
                        },
                        { validator: passwordValidtor, trigger: 'blur' },
                    ],
                    checkPass: [{ validator: validateChangedPassword, trigger: 'blur' }],
                },
            };
        },

        methods: {
            handleSubmit() {
                if (this.otpSent) {
                    this.$refs.form.validate(async (valid) => {
                        if (valid) {
                            this.$emit('submit', this.form.otp);
                            this.verifiedEmailOTP = true;
                        }
                    });
                }
            },
            emailValidate() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', this.form.email);
                        this.otpSent = true;
                    }
                });
            },
            changeEmail() {
                this.otpSent = false;
                this.form.email = '';
                this.form.otp = '';
            },
            submitNewPass() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', this.form.password);
                        this.$router.push('/login');
                    }
                });
            },
        },
    };
</script>
