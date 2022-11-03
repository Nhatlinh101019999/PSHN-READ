<template>
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
    >
        <div class="grid grid-cols-3 mb-5 gap-3 ">
            <a-form-model-item label="Họ và tên" prop="name">
                <a-input v-model="form.fullName" :disabled="disabled" placeholder="Họ và tên" />
            </a-form-model-item>

            <a-form-model-item label="Ngày sinh" prop="date">
                <a-input
                    v-model="form.birthDay"
                    :disabled="disabled"
                    type="text"
                    placeholder="ngày sinh"
                />
            </a-form-model-item>

            <a-form-model-item label="Giới tính" prop="gender">
                <a-select v-model="form.gender" size="large" placeholder="Giới tính">
                    <a-select-option
                        v-for="item in PATIENT_GENDER_OPTIONS"
                        :key="item.value"
                        :disabled="disabled"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
        </div>
        <div class="grid grid-cols-2 mb-5 gap-3">
            <a-form-model-item label="Số điện thoại" prop="phone">
                <a-input v-model="form.phoneNumber" :disabled="disabled" placeholder="Số điện thoại" />
            </a-form-model-item>

            <a-form-model-item label="Email" prop="mail">
                <a-input
                    v-model="form.email"
                    :disabled="disabled"
                    type="text"
                    placeholder="Email"
                />
            </a-form-model-item>
        </div>
        <div class="grid grid-cols-3 mb-5 gap-3" label="Địa chỉ">
            <a-form-model-item label="Tỉnh/Thành phố" prop="provinceId">
                <SelectRemote
                    ref="provinceSelection"
                    v-model="form.provinceName"
                    fetch-url="selections/fetchProvinces"
                    option-label="title"
                    option-value="id"
                    :disabled="disabled"
                    show-search
                    search-key="freeWord"
                    store="selections"
                    store-prop="provinces"
                    :search-params="{ provinceId: form.provinceId }"
                    placeholder="Vui lòng chọn Tỉnh/Thành phố"
                    @change="(provinceId) => {
                        $refs.districtsSelection.handleDeleteItem()
                        $refs.districtsSelection.fetchData('', { provinceId })
                        $refs.districtsSelection.selectValue = undefined
                        $refs.wardSelection.selectValue = undefined
                    }"
                />
            </a-form-model-item>
            <a-form-model-item label="Quận/Huyện" prop="districtId">
                <SelectRemote
                    ref="districtsSelection"
                    v-model="form.districtName"
                    fetch-url="selections/fetchDistricts"
                    option-label="title"
                    option-value="id"
                    search-key="freeWord"
                    store="selections"
                    :disabled="disabled"
                    store-prop="districts"
                    :auto-fetch="!!form.provinceId"
                    :search-params="{ provinceId : form.provinceId }"
                    placeholder="Vui lòng chọn Quận Huyện"
                    :custom-options="[{
                        id: form.provinceId,
                        title: form.provinceName
                    }]"
                    @change="(provinceId) => {
                        $refs.districtsSelection.handleDeleteItem()
                        $refs.districtsSelection.fetchData('', { districtId })
                        $refs.districtsSelection.selectValue = undefined
                        $refs.wardSelection.selectValue = undefined
                    }"
                />
            </a-form-model-item>
            <a-form-model-item label="Phường/Xã" prop="wardId">
                <SelectRemote
                    ref="wardSelection"
                    v-model="form.wardName"
                    fetch-url="selections/fetchWards"
                    option-label="title"
                    :disabled="disabled"
                    option-value="id"
                    search-key="freeWord"
                    :auto-fetch="!!form.districtId"
                    store="selections"
                    store-prop="wards"
                    :search-params="{ districtId: form.districtId }"
                    placeholder="Vui lòng chọn Phường/Xã"
                />
            </a-form-model-item>
        </div>
        <div class="grid grid-cols-1 mt-5 mb-5 gap-3">
            <a-form-model-item label="Địa chỉ" prop="address">
                <a-input
                    v-model="form.address"
                    :disabled="disabled"
                    type="text"
                    placeholder="Địa chỉ"
                />
            </a-form-model-item>
        </div>
        <div class="grid grid-cols-2 mb-5 gap-3">
            <a-form-model-item label="Mã bệnh nhân" prop="patientCode">
                <a-input
                    v-model="form.patientCode"
                    :disabled="disabled"
                    type="text"
                    placeholder="Mã bệnh nhân"
                />
            </a-form-model-item>
            <a-form-model-item label="CMT/CCCD" prop="mail">
                <a-input type="text" placeholder="CCCD" />
            </a-form-model-item>
        </div>
        <div class="grid grid-cols-3 mb-5 gap-3">
            <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :before-upload="beforeUpload"
                @change="handleChange"
            >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar">
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">
                        Upload
                    </div>
                </div>
            </a-upload>
        </div>
        <button @click="click">
            click
        </button>
    </a-form-model>
</template>

<script>
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    import _cloneDeep from 'lodash/cloneDeep';

    import { PATIENT_GENDER_OPTIONS } from '../../constants/patient/patient';

    const defaultForm = {
        name: '',
        date: '',
        gender: 'Nam',
        phone: '',
        email: '',
        provinceId: null,
        districtId: null,
        wardId: null,
    };
    export default {
        components: { SelectRemote },
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            question: Object,
        },
        data() {
            return {
                form: this.question ? _cloneDeep(this.question) : _cloneDeep(defaultForm),
                rules: {
                    name: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    date: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    gender: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    phone: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    email: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    patientCode: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    address: [{ required: true, message: 'Không được để trống trường này', trigger: ['blur', 'change'] }],
                    provinceId: [
                        { required: true, message: 'Vui lòng chọn Tỉnh/Thành phố', trigger: 'change' },
                    ],
                    districtId: [
                        { required: true, message: 'Vui lòng chọn Quận/Huyện', trigger: 'change' },
                    ],
                    wardId: [
                        { required: true, message: 'Vui lòng chọn Phường/Xã', trigger: 'change' },
                    ],

                },
                loading: false,
                imageUrl: '',
                PATIENT_GENDER_OPTIONS,

            };
        },
        computed: {
            // dataForm() {
            //     return this.form;
            // },
        },
        // watch: {
        //     question() {
        //         this.form = this.question ? _cloneDeep(this.question) : _cloneDeep(defaultForm);
        //     },
        // },
        methods: {
            handleChange(info) {
                console.log(info);
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    const data = new FormData();
                    data.append('files', info.file.originFileObj);
                }
            },
            click() {
                console.log(this.form);
            },

            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!');
                }
                return isJpgOrPng && isLt2M;
            },
        },
    };
</script>

<style lang="scss">
.ant-upload.ant-upload-select-picture-card {
    @apply w-80 h-52 #{!important};
}
</style>
