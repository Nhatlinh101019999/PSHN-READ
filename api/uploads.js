export default (axios) => ({
    uploadImage: (data) => axios.post('/r/uploads/image', data).then((_) => _.data),
});
