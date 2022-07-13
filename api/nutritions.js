export default (axios) => ({
    getAll: () => axios.get('/a/nutrition_categories').then((_) => _.data),
    create: (data) => axios.post('/a/nutrition_categories', data).then((_) => _.data),
    update: (nutriontionCategoryId, data) => axios.patch(`/a/nutrition_categories/${nutriontionCategoryId}`, data).then((_) => _.data),
    delete: (nutriontionCategoryId) => axios.delete(`/a/nutrition_categories/${nutriontionCategoryId}`).then((_) => _.data),
});
