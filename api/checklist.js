export default (axios) => ({
    getAll: () => axios.get('/a/checklists').then((_) => _.data),
    create: (data) => axios.post('/a/checklists', data).then((_) => _.data),
    update: (checklistId, data) => axios.patch(`/a/checklists/${checklistId}`, data).then((_) => _.data),
    delete: (checklistId) => axios.delete(`/a/checklists/${checklistId}`).then((_) => _.data),
    active: (checklistId) => axios.patch(`/a/checklists/${checklistId}/active`).then((_) => _.data),
    inactive: (checklistId) => axios.patch(`/a/checklists/${checklistId}/inactive`).then((_) => _.data),

});
