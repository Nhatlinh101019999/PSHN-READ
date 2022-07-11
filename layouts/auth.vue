<template>
    <div class="flex justify-between h-screen">
        <div class="w-1/2 hidden lg:flex !bg-green-5 p-6 items-center">
            <img src="/images/logo-text.png" class="mx-auto">
        </div>
        <div class="w-screen lg:w-1/2 flex flex-col justify-center items-center m-4">
            <div class="w-full flex-grow flex flex-col items-center justify-center">
                <img class="lg:hidden w-56" src="/images/logo.png">
                <nuxt class="w-full mt-12 mb-36" />
            </div>
            <div class="text-gray-80 text-center flex justify-center items-center flex-wrap space-x-2">
                <div>Copyright &copy; {{ new Date() | dateFormat('yyyy') }} PHSN.</div>
                <div>All rights reserved.</div>
            </div>
        </div>
    </div>
</template>
