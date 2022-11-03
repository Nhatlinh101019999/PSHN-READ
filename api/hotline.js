export default (axios) => ({
    getAll: () => axios.get('/a/hotlines').then((_) => _.data),
    create: (data) => axios.post('/a/hotlines', data).then((_) => _.data),
    update: (hotlineId, data) => axios.patch(`/a/hotlines/${hotlineId}`, data).then((_) => _.data),
    delete: (hotlineId) => axios.delete(`/a/hotlines/${hotlineId}`).then((_) => _.data),

});
