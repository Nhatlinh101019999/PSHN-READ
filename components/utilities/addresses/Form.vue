<template>
    <div>
        <div v-if="edit" class="flex justify-end">
            <button type="bule" class="m-4" @click="()=>{edit=false}">
                Chỉnh sửa
            </button>
            <button type="red" class="m-4" @click="$refs.address.open(form)">
                Xóa
            </button>
        </div>
        <div v-else class="flex justify-end">
            <button @click="submit">
                Cập nhật
            </button>
        </div>
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-2 mb-5 gap-3">
                <a-form-model-item label="Tên bệnh viện" prop="name">
                    <a-input v-model="form.name" :disabled="edit" placeholder="Nhập tên bệnh viện" />
                </a-form-model-item>
                <a-form-model-item label="Số điện thoại" prop="phone">
                    <a-input
                        v-model="form.phone"
                        :disabled="edit"
                        type="text"
                        placeholder="Nhập số điện thoại"
                    />
                </a-form-model-item>
            </div>
            <div class="grid grid-cols-3 mb-5 gap-3">
                <SelectRemote
                    ref="provinceSelection"
                    v-model="form.provinceId"
                    fetch-url="selections/fetchProvinces"
                    option-label="title"
                    option-value="id"
                    store="selections"
                    store-prop="provinces"
                    :disabled="edit"
                    size="large"
                    placeholder="Chọn tỉnh/thành phố"
                    @change="(provinceId) => {
                        $refs.districtsSelection.handleDeleteItem()
                        $refs.districtsSelection.fetchData('', { provinceId })
                        $refs.districtsSelection.selectValue = undefined
                        $refs.wardSelection.selectValue = undefined
                    }"
                />
                <SelectRemote
                    ref="districtsSelection"
                    v-model="form.districtId"
                    fetch-url="selections/fetchDistricts"
                    option-label="title"
                    option-value="id"
                    :disabled="edit"
                    store="selections"
                    store-prop="districts"
                    size="large"
                    placeholder="Chọn quận/huyện"
                    @change="(districtId) => {
                        $refs.wardSelection.handleDeleteItem()
                        $refs.wardSelection.fetchData('', { districtId })
                        $refs.wardSelection.selectValue = undefined
                    }"
                />
                <SelectRemote
                    ref="wardSelection"
                    v-model="form.wardId"
                    fetch-url="selections/fetchWards"
                    option-label="title"
                    :disabled="edit"
                    option-value="id"
                    store="selections"
                    store-prop="wards"
                    size="large"
                    placeholder="Chọn phường/xã"
                />
            </div>
            <div class="grid grid-cols-1 mb-5 gap-3">
                <a-input
                    v-model="form.address"
                    :disabled="edit"
                    placeholder="Nhập địa chỉ bệnh viện"
                />
            </div>
        </a-form-model>
        <DeleteAddress ref="address" />
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _isEmpty from 'lodash/isEmpty';
    import SelectRemote from '../../filters/SelectRemote.vue';
    import DeleteAddress from './DeleteAddress.vue';

    const defaultForm = {
        name: '',
        phone: '',
        provinceId: null,
        districtId: null,
        wardId: null,
        latitude: 10,
        longitude: 10,
        address: '',
    };
    export default {
        components: { SelectRemote, DeleteAddress },
        props: {
            address: Object,
        },
        data() {
            return {
                form: !_isEmpty(this.address) ? _cloneDeep(this.address) : _cloneDeep(defaultForm),
                edit: _cloneDeep(!!this.address?.id),
                rules: {
                    name: [{
                        required: true,
                        message: 'Không được để trống mục này',
                        trigger: 'change',
                    }],
                    phone: [{
                        required: true,
                        message: 'Không được để trống mục này',
                        trigger: 'change',
                    }],
                    provinceId: [
                        { required: true, message: 'Vui lòng chọn Tỉnh/Thành phố', trigger: 'change' },
                    ],
                    districtId: [
                        { required: true, message: 'Vui lòng chọn Quận/Huyện', trigger: 'change' },
                    ],
                    wardId: [
                        { required: true, message: 'Vui lòng chọn Phường/Xã', trigger: 'change' },
                    ],
                    address: [
                        { required: true, message: 'Không để trống mục này', trigger: 'change' },
                    ],
                },
            };
        },

        mounted() {
            console.log(this.form);
        },

        methods: {
            submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        if (this.form.id) {
                            this.update(this.form);
                        } else {
                            this.create(this.form);
                        }
                    }
                });
            },

            async update(form) {
                try {
                    this.loading = true;
                    await this.$api.addresses.update(form.id, form);
                    this.edit = true;
                    this.$nuxt.refresh();
                    this.$message.success('Cập nhật địa chỉ thành công');
                } catch (error) {
                    this.$handerError(error);
                } finally {
                    this.loading = false;
                }
            },
            async create(form) {
                try {
                    this.loading = true;
                    await this.$api.addresses.create(form);
                    this.edit = true;
                    this.$nuxt.refresh();
                    this.$message.success('Tạo mới địa chỉ thành công');
                } catch (error) {
                    this.$handerError(error);
                } finally {
                    this.loading = false;
                }
            },

        },
    };
</script>

<style>

</style>
