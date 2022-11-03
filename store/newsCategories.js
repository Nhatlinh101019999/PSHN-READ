export const state = () => ({
    newsCategory: [],
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
    async fetchCategory({ commit }, query) {
        const { data: { newsCategories, pagination } } = await this.$api.newsCategories.getAll(query);
        console.log(pagination);
        commit('SET_STATE', { prop: 'newsCategory', data: newsCategories });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

};
