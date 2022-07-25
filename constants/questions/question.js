export const QUESTIONS_STATUS = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
};
export const QUESTION_TYPE = {
    MULTIPLE: 'multipleChoice',
    SINGLE: 'singleChoice',
};

export const QUESTIONS_STATUS_OPTIONS = [{
    label: 'Hoạt động',
    color: 'green',
    value: QUESTIONS_STATUS.ACTIVE,
}, {
    label: 'Ngưng hoạt động',
    color: 'danger',
    value: QUESTIONS_STATUS.INACTIVE,
}];
export const QUESTIONS_TYPE_OPTIONS = [{
    label: 'Chọn nhiều',
    color: 'green',
    value: QUESTION_TYPE.MULTIPLE,
}, {
    label: 'Chọn một',
    color: 'blue',
    value: QUESTION_TYPE.SINGLE,
}];
