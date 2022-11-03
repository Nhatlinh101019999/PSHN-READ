export default (axios) => ({
    getAll: () => axios.get('/a/hospital_address').then((_) => _.data),
    create: (data) => axios.post('/a/hospital_address', data).then((_) => _.data),
    update: (hospitalAddressId, data) => axios.patch(`/a/hospital_address/${hospitalAddressId}`, data).then((_) => _.data),
    delete: (hospitalAddressId) => axios.delete(`/a/hospital_address/${hospitalAddressId}`).then((_) => _.data),
});
