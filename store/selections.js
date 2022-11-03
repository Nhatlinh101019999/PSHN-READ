export const state = () => ({
    provinces: [],
    districts: [],
    wards: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchProvinces({ commit }, params) {
        const { data: { provinces } } = await this.$api.selections.getProvinces(params);
        commit('SET_STATE', { prop: 'provinces', data: provinces });
        console.log(provinces);
    },

    async fetchDistricts({ commit }, params) {
        const { data: { districts } } = await this.$api.selections.getDistricts(params);
        commit('SET_STATE', { prop: 'districts', data: districts });
    },

    async fetchWards({ commit }, params) {
        const { data: { wards } } = await this.$api.selections.getWards(params);
        commit('SET_STATE', { prop: 'wards', data: wards });
    },
};
