export default (axios) => ({
    getAll: (params) => axios.get('/a/question_categories', { params }).then((_) => _.data),
    create: (data) => axios.post('/a/question_categories', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/question_categories/${id}`, data).then((_) => _.data),
    detail: (id) => axios.get(`/a/question_categories/${id}`).then((_) => _.data),
    delete: (id) => axios.delete(`/a/question_categories/${id}`).then((_) => _.data),
});
