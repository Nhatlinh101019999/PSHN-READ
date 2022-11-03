export default (axios) => ({
    getAll: (params) => axios.get('/a/news', { params }).then((_) => _.data),
    create: (data) => axios.post('/a/news', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/news/${id}`, data).then((_) => _.data),
    detail: (id) => axios.get(`/a/news/${id}`).then((_) => _.data),
    delete: (id) => axios.delete(`/a/news/${id}`).then((_) => _.data),
});
