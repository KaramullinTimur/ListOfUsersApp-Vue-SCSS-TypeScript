<template>
    <section class="filters">
        <div class="filters-container">
            <label for="filters-select" class="filters-label">Show users:</label>
            <select 
                id="filters-select" class="filters-select"
                v-model="usersNumber"
            >
                <option value="all">all</option>
                <option value="4">4</option>
                <option value="8">8</option>
            </select>
        </div>
    </section>

    <section class="table">
        <div class="table-header">
            <div class="table-header-container">
                <div class="table-header-field table-header-name" @click="sortedBy='name'">Name</div>
                <div class="table-header-field table-header-username" @click="sortedBy='username'">User name</div>
                <div class="table-header-field table-header-email" @click="sortedBy='email'">Email</div>
                <div class="table-header-field table-header-phone" @click="sortedBy='phone'">Phone</div>
                <div class="table-header-field table-header-buttons"></div>
            </div>
        </div>
        <ul class="table-list" v-if="users.length > 0">
            <li 
                class="table-item"
                v-for="(user, i) in sortedUsers" :key="i"
                :class="{active : activeUser === i}"
            >
                <div class="table-item-container">
                    <div class="table-item-field table-item-name">
                        <input 
                            type="text" 
                            :disabled="activeUser !== i"
                            class="table-item-input"
                            :value="user.name"
                            @input="newName = $event.target.value"
                        >
                    </div>
                    <div class="table-item-field table-item-username">
                        <input 
                            type="text" 
                            :disabled="activeUser !== i"
                            class="table-item-input"
                            :value="user.username"
                            @input="newUsername = $event.target.value"
                        >
                    </div>
                    <div class="table-item-field table-item-email">
                        <input 
                            type="email" 
                            :disabled="activeUser !== i"
                            class="table-item-input"
                            :value="user.email"
                            @input="newEmail = $event.target.value"
                        >
                    </div>
                    <div class="table-item-field table-item-phone">
                        <input 
                            type="text" 
                            :disabled="activeUser !== i"
                            class="table-item-input"
                            :value="user.phone"
                            @input="newPhone = $event.target.value"
                        >
                    </div>
                    <div class="table-item-field table-item-buttons">
                        <button 
                            title="Edit user"
                            class="table-item-button table-item-edit"
                            @click="editUser(i)"
                            v-if="activeUser !== i"
                        ></button>
                        <button 
                            title="Save changes"
                            class="table-item-button table-item-save"
                            @click="saveChanges(i)"
                            v-if="activeUser === i"
                        ></button>
                        <button 
                            title="Cancel changes"
                            class="table-item-button table-item-cancel"
                            @click="cancelChanges()"
                            v-if="activeUser === i"
                        ></button>
                        <button 
                            title="Delete user"
                            class="table-item-button table-item-delete"
                            @click="deleteUser(i)"
                            v-if="activeUser !== i"
                        ></button>
                    </div>
                </div>
            </li>
        </ul>
        <p v-else class="table-empty">No users</p>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IUser from '../interfaces/IUser';

export default defineComponent({
    data() {
        return {
            // Current user item
            activeUser: null as number | null,

            // New user inputs
            newName: '',
            newUsername: '',
            newEmail: '',
            newPhone: '',

            // Filters
            usersNumber: 'all',

            // Sort
            sortedBy: '',
        }
    },
    computed: {
        // Users from API
        users(): IUser[] {
            return this.$store.getters.getUsers
        },

        // Filtered users
        filteredUsers(): IUser[] {
            if(this.usersNumber !== 'all') {
                return this.users.slice(0, +this.usersNumber)
            } else {
                return this.users
            }
        },

        // Search input from header component
        searchInput(): string {
            return this.$store.getters.getSearchInput
        },
        // Searched users
        searchedUsers(): IUser[] {
            return this.filteredUsers.filter(user => user.name.toLowerCase().includes(this.searchInput.toLowerCase()))
        },

        // Sorted users
        sortedUsers(): IUser[] {
            if(this.sortedBy) {
                return this.searchedUsers.slice().sort((a: any, b: any) => a[this.sortedBy].localeCompare(b[this.sortedBy]))
            } else {
                return this.searchedUsers
            }
        },
    },
    methods: {
        editUser(i: number) {
            this.newName = ''
            this.newUsername = ''
            this.newEmail = ''
            this.newPhone = ''
            this.activeUser = i;
        },
        saveChanges(i: number) {
            if(this.newName) {
                this.users[i].name = this.newName
                this.newName = ''
            }
            if(this.newUsername) {
                this.users[i].username = this.newUsername
                this.newUsername = ''
            }
            if(this.newEmail) {
                this.users[i].email = this.newEmail
                this.newEmail = ''
            }
            if(this.newPhone) {
                this.users[i].phone = this.newPhone
                this.newPhone = ''
            }
            this.activeUser = null
        },
        cancelChanges() {
            this.newName = ''
            this.newUsername = ''
            this.newEmail = ''
            this.newPhone = ''
            this.activeUser = null
        },
        deleteUser(i: number) {
            this.newName = ''
            this.newUsername = ''
            this.newEmail = ''
            this.newPhone = ''
            this.$store.dispatch('deleteUser', i)
        },
    },
    mounted() {
        // Fetch data from API
        this.$store.dispatch('fetchUsers');
    }
});
</script>

<style lang="scss" scoped>

// FILTERS SECTION
.filters {
    padding: 20px 0;
}
.filters-container {
    max-width: 1080px;
    margin: 0 auto;
}
.filters-label {
    margin-right: 12px;
    font-weight: 400;
    font-size: 16px;
}
.filters-select {
    padding: 2px 5px;
    font-weight: 400;
    font-size: 14px;
    border: 1px solid var(--grey);

    &:focus {
        outline: none;
    }
}


// TABLE SECTION
.table {
    padding-bottom: 40px;
}
.table-list {
    width: 100vw;
}

.table-header {
    padding: 8px 0;
    border-top: 1px solid var(--grey-light);
    border-bottom: 1px solid var(--grey-light);
    background-color: var(--main-light);
}
.table-header-container {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.table-header-field {
    padding: 0 12px;
    flex-grow: 1;
    flex-basis: 20%;
    font-weight: 500;
    font-size: 16px;
    border-right: 1px solid var(--grey-light);
    background: url('../assets/icons/sort.svg') no-repeat center right 8px / 16px;
    cursor: pointer;

    &:first-child {
        border-left: 1px solid var(--grey-light);
    }
}

.table-item {
   border-bottom: 1px solid var(--grey-light); 
   padding: 16px 0;

    &:hover {
        background-color: var(--light);
    } 

    // When edit button was clicked
    &.active {
        box-shadow: inset 0 0 28px var(--main-light);
    }
    &.active:hover {
        background-color: transparent;
    }
}
.table-item-container {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.table-item-field {
    padding: 0 12px;
    flex-grow: 1;
    flex-basis: 20%;
}
.table-item-input {
    width: 100%;
    height: 100%;
    font-weight: 400;
    font-size: 16px;
    border: 0;
    background-color: #fff;
    outline: 1px solid var(--grey);
    text-overflow: ellipsis;

    &:disabled {
        padding: 0;
        color: var(--text);
        background-color: transparent;
        outline: none;
    }
}

.table-item-buttons {
    display: flex;
    justify-content: space-around;
}
.table-item-button {
    width: 22px;
    height: 22px;
    border: 0;
    background-color: transparent;
    cursor: pointer;

    &:hover {
       transform: scale(1.05)
    }
    &:active {
       transform: scale(1)
    }
}
.table-item-edit {
    background: url('../assets/icons/edit.svg') no-repeat center / 22px;
}
.table-item-save {
    background: url('../assets/icons/save.svg') no-repeat center / 18px;
}
.table-item-delete {
    background: url('../assets/icons/delete.svg') no-repeat center / 22px;
}
.table-item-cancel {
    background: url('../assets/icons/cancel.svg') no-repeat center / 18px;
}

.table-empty {
    padding: 40px 0;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
}
</style>
