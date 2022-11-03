export const NEWS_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DRAFT: 'draft',
};

export const NEWS_STATUS_OPTIONS = [{
    label: 'Đang hoạt động',
    color: 'green',
    value: NEWS_STATUS.ACTIVE,
}, {
    label: 'Đã ẩn',
    color: 'danger',
    value: NEWS_STATUS.INACTIVE,
}, {
    label: 'Bản nháp',
    color: 'yellow',
    value: NEWS_STATUS.DRAFT,
}];
