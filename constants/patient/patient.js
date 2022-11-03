export const PATIENT_GENDER = {
    MALE: '1',
    FEMALE: '2',
};
export const PATIENT_STATUS = {
    ACTIVE: true,
    INACTIVE: false,
};
export const PATIENT_GENDER_OPTIONS = [{
    label: 'Nam',
    color: 'green',
    value: PATIENT_GENDER.MALE,
}, {
    label: 'Nữ',
    color: 'danger',
    value: PATIENT_GENDER.FEMALE,
}];
export const PATIENT_STATUS_OPTIONS = [{
    label: 'Đang hoạt động',
    color: 'green',
    value: PATIENT_STATUS.ACTIVE,
}, {
    label: 'Ngừng hoạt động',
    color: 'danger',
    value: PATIENT_STATUS.INACTIVE,
}];
