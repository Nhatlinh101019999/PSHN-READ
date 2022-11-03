export const state = () => ({
    patient: [],
    detailPatient: {},
    pagination: {
        total: 0,
        page: 0,
        perPage: 0,
    },
});

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },

};

export const actions = {
    async fetchPatient(context, payload) {
        const { data: { users, pagination } } = await this.$api.patient.getAll(payload);
        console.log(users);
        context.commit('SET_STATE', { prop: 'patient', data: users || [] });
        // commit('SET_STATE', { prop: 'pagination', data: pagination || {} });
        context.commit('SET_STATE', { prop: 'pagination', data: pagination || {} });
    },
    async fetchDetailPatients({ commit }, payload) {
        const { data: { account } } = await this.$api.patient.detail(payload);
        console.log(account);
        commit('SET_STATE', { prop: 'detailPatient', data: account });
    },
};
