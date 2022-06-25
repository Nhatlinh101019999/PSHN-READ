export default (axios) => ({
    updateProfile: (data) => axios.post('/user/update_profile', data).then((_) => _.data),
    updatePassword: (data) => axios.post('/user/change_password', data).then((_) => _.data),
});
