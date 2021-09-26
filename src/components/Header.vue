<template>
    <header class="header">
        <div class="header-container">
            <h1 class="header-logo">List of users</h1>
            <input 
                type="search" placeholder="Search by name"
                class="header-search" 
                @input="setSearchInput($event.target.value)"
            >
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        // Commit search input valeu to the store
        setSearchInput(searchInput: string) {
            this.$store.commit('setSearchInput', searchInput.trim())
        }
    }
});
</script>

<style lang="scss" scoped>
.header {
    padding: 40px 0;
    border-bottom: 1px solid var(--grey-light);
}
.header-container {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 40px;
}
.header-logo {
    font-weight: 700;
    font-style: italic;
    font-size: 28px;
    cursor: default;
    text-transform: uppercase;
    border-bottom: 5px solid var(--main);
}
.header-search {
    padding: 4px 16px;
    font-size: 16px;
    border-radius: 14px;
    border: 1px solid var(--grey);

    &::placeholder {
        color: var(--grey);
    }
    &:focus {
        outline: none;
        box-shadow: inset 0 0 6px var(--shadow);
    }
}
.header-button-new {
    padding: 6px 16px;
    font-size: 14px;
    border-radius: 14px;
    border: none;
    background-color: var(--main);
    color: #fff;
    cursor: pointer;

    &:focus, &:hover {
        outline: none;
        box-shadow: 0 0 12px var(--main);
    }
    &:active {
        transform: scale(0.98)
    }
}

</style>
