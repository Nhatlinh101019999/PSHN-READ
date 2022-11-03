export const state = () => ({
    listnews: [],
    pagination: {
        total: 0,
        page: 0,
        perPage: 0,
    },
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchNews({ commit }, query) {
        const { data: { news, pagination } } = await this.$api.news.getAll(query);
        console.log(pagination);
        commit('SET_STATE', { prop: 'listnews', data: news });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

};
