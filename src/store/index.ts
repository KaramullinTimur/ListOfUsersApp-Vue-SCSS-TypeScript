import { createStore } from 'vuex'
import IUser from '../interfaces/IUser';

export default createStore({
    state: {
        // Users from API
        users: [] as IUser[],

        // Animation flag
        isLoading: false,

        // Search input
        searchInput: '',
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getIsLoading(state) {
            return state.isLoading
        },
        getSearchInput(state) {
            return state.searchInput
        },
    },
    mutations: {
        // API data manipulation
        setUsers(state, users) {
            state.users = users
        },
        deleteUser(state, i: number) {
            state.users.splice(i, 1)
        },

        // Loading animation
        setLoading(state) {
            state.isLoading = true
        },
        unsetLoading(state) {
            state.isLoading = false
        },

        // Search
        setSearchInput(state, searchInput: string) {
            state.searchInput = searchInput
        },
    },
    actions: {
        // Fetch users from API
        fetchUsers({commit}) {
            // Start loading animation
            commit('setLoading')
            // Delay to show loading animation
            setTimeout(()=> {
                fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((users) => {
                    // Finish laoding animation
                    commit('unsetLoading')
                    // Commit data
                    commit('setUsers', users)
                });
            }, 1000)
            
        },
        // Delete user
        deleteUser({commit}, i) {
            commit('deleteUser', i)
        }
    }
})
