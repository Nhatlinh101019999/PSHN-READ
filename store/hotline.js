export const state = () => ({
    hotline: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
    ADD_HOTLINE(state) {
        state.hotline.unshift({});
    },
};

export const actions = {
    async fetchHotline({ commit }) {
        const { data: { hotlines } } = await this.$api.hotline.getAll();
        commit('SET_STATE', { prop: 'hotline', data: hotlines });
    },

};
