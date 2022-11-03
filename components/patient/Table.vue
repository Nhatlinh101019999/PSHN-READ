<template>
    <a-table :columns="columns" :data-source=" dataSoucre" :pagination="false">
        <template slot="fullName" slot-scope="fullName, record">
            <div class="font-semibold text-sm">
                {{ record.fullName }}
            </div>
            <div class=" text-xs font-light text-slate-200 leading-4" :title="record.email">
                {{ record.phoneNumber }}
            </div>
        </template>
        <div slot="hisPatientId" slot-scope="text, record, index">
            <div class="">
                {{ index +1 }}
            </div>
        </div>
        <div slot="gender" slot-scope="text">
            <div class="">
                {{ text === '1'? 'Nam' :'Nữ' }}
            </div>
        </div>
        <div slot="disabled" slot-scope="text, record">
            <a-tag :color="record.disabled === 'false'? 'red' :'green'">
                {{ record.disabled === 'false'? 'Ngừng hoạt động' :'Đang hoạt động' }}
            </a-tag>
        </div>
        <template slot="operation1" slot-scope="scope, record">
            <div class="bg-transparent flex justify-center items-center gap-3">
                <a-dropdown placement="bottomRight">
                    <a class="ant-dropdown-link">
                        <a-icon type="more" :rotate="90" />
                    </a>
                    <a-menu slot="overlay" class="w-40">
                        <a-menu-item key="0">
                            <nuxt-link :to="`/patient/${record._id}/detailPatient`">
                                Xem chi tiết
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="1" @click="changeStatusQuestion(record)">
                            {{ record.status === 'active' ? 'Ngừng hoạt động':'Hoạt động' }}
                        </a-menu-item>
                        <a-menu-item key="2" @click="handleRemoveQuestion(record.key)">
                            Xóa
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </template>
    </a-table>
</template>
  <script>
    import { mapState } from 'vuex';
    import _cloneDeep from 'lodash/cloneDeep';

    const columns = [
        {
            title: 'STT',
            dataIndex: 'hisPatientId',
            key: 'hisPatientId',
            scopedSlots: { customRender: 'hisPatientId' },
            align: 'center',
        },
        {
            title: 'Họ và tên',
            key: 'fullName',
            dataIndex: 'fullName',
            scopedSlots: { customRender: 'fullName' },
            align: 'center',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            scopedSlots: { customRender: 'gender' },
            align: 'center',
        },
        {
            title: 'Mail',
            key: 'email',
            dataIndex: 'email',
            scopedSlots: { customRender: 'email' },
            align: 'center',
        },
        {
            title: 'Trạng thái',
            key: 'disabled',
            dataIndex: 'disabled',
            scopedSlots: { customRender: 'disabled' },
            align: 'center',
        },
        {
            dataIndex: 'operation',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'operation1' },
            align: 'center',
        },
    ];
    export default {

        data() {
            return {
                columns,
            };
        },
        computed: {
            ...mapState('patient', ['patient']),
            dataSoucre() {
                return _cloneDeep(this.patient);
            },
        },
        methods: {
            changeStatusQuestion(payload) {
                this.$emit('changestatus', payload);
            },
            handleRemoveQuestion(payload) {
                this.$emit('removestatus', payload);
            },
        },
    };
  </script>
