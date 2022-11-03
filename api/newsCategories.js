export default (axios) => ({
    getAll: (params) => axios.get('/a/news_categories', { params }).then((_) => _.data),
    create: (data) => axios.post('/a/news_categories', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/news_categories/${id}`, data).then((_) => _.data),
    detail: (id) => axios.get(`/a/news_categories/${id}`).then((_) => _.data),
    delete: (id) => axios.delete(`/a/news_categories/${id}`).then((_) => _.data),
});
