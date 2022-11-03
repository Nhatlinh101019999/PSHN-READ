export const state = () => ({
    address: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
    ADD_ADDRESS(state) {
        state.address.push({});
    },
};

export const actions = {
    async fetchAddress({ commit }) {
        const { data: { hospitalAddress } } = await this.$api.addresses.getAll();
        console.log(hospitalAddress);
        commit('SET_STATE', { prop: 'address', data: hospitalAddress });
    },

};
