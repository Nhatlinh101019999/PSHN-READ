<template>
    <div>
        <div class="flex flex-col items-center">
            <div class="text-5xl pb-8 font-semibold text-green-100">
                Đăng nhập
            </div>
            <a-alert
                v-if="error"
                :message="error"
                class="text-center !mb-4"
                type="warning"
                show-icon
            />
            <LoginForm :loading="loading" class="mt-3 max-w-[400px] w-full" @submit="login" />
        </div>
    </div>
</template>

<script>
    import LoginForm from '@/components/auth/forms/Login.vue';

    export default {
        layout: 'auth',

        auth: 'guest',

        components: {
            LoginForm,
        },

        data() {
            return {
                loading: false,
                error: undefined,
            };
        },

        methods: {
            login(form) {
                this.loading = true;
                this.$auth
                    .loginWith('local', {
                        data: form,
                    })
                    .then(async () => {
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        this.$handleError(error, (_error) => {
                            const errorData = _error?.response?.data?.error;

                            if (errorData?.code === 215) {
                                this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác';
                                this.$forceUpdate();
                            }
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        },
        head() {
            return {
                title: 'Đăng nhập | PSHN',
            };
        },
    };
</script>
