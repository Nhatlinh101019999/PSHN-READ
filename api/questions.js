export default (axios) => ({
    getAll: (params) => axios.get('/a/questions/', { params }).then((_) => _.data),
    create: (data) => axios.post('/a/questions/', data).then((_) => _.data),
    detail: (id) => axios.get(`/a/questions/${id}`).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/questions/${id}`, data).then((_) => _.data),
    delete: (id) => axios.delete(`/a/questions/${id}`).then((_) => _.data),
    active: (id) => axios.patch(`/a/questions/${id}/active`).then((_) => _.data),
    inactive: (id) => axios.patch(`/a/questions/${id}/inactive`).then((_) => _.data),
});
