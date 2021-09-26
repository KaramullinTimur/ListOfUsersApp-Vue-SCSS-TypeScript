<template>
  <Header />
  <Table />
  <div class="loading-container" v-if="isLoading">
    <div class="loading">
      <div class="loading-item"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Table from './components/Table.vue';
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    interface State {
        count: number
    }
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}

export default defineComponent({
  name: 'App',
  computed: {
    // Animation flag
    isLoading(): boolean {
      return this.$store.getters.getIsLoading
    }
  },
  components: {
    Header, Table,
  }
});
</script>

<style lang="scss">

// Import fonts, variables and reset files
  @import './assets/scss/fonts.scss';
  @import './assets/scss/variables.scss';
  @import './assets/scss/base.scss';


  // Loading animation
  .loading-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.2);
  }
  .loading {
    width: 100px;
    height: 100px;
    position: relative;
    left: 40%;
    top: 40%;
    animation: loading 1s linear infinite;
  }
  .loading-item {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--main);
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
