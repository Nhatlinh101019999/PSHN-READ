<template>
    <div>
        <a-alert
            v-if="error"
            class="!mt-3 w-full"
            :message="error"
            type="warning"
            show-icon
        />
        <ForgotPassordForm />
    </div>
</template>

<script>
    import ForgotPassordForm from '@/components/auth/forms/ForgotPassword.vue';

    export default {
        layout: 'auth',
        components: {
            ForgotPassordForm,
        },
        head() {
            return {
                title: 'Quên Mật Khẩu | PSHN',
            };
        },
    };
</script>
