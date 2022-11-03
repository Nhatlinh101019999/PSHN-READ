export default (axios) => ({
    getProvinces: (params) => axios.get('/selections/provinces', { params }).then((_) => _.data),
    getDistricts: (params) => axios.get('/selections/districts', { params }).then((_) => _.data),
    getWards: (params) => axios.get('/selections/wards', { params }).then((_) => _.data),
});
