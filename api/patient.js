export default (axios) => ({
    getAll: (params) => axios.get('/a/users/', { params }).then((_) => _.data),
    detail: (id) => axios.get(`/a/users/${id}`).then((_) => _.data),
});
