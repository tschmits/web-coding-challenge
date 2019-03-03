import chai from 'chai'
import spies from 'chai-spies'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Results from '@/components/Results.vue'
import Vuex from 'vuex';

const localVue = createLocalVue();

chai.use(spies);

localVue.use(Vuex);


describe('Results.vue', () => {
  let state;
  let mutations;
  let store;

  beforeEach(() => {
    state = {
      error: null,
      isSearching: false,
      items: [],
    };
    mutations = {
      setError(state, { error }) {
        state.error = error;
      },
      setIsSearching(state, { isSearching }) {
        state.isSearching = isSearching;
      },
      setItems(state, { items }) {
        state.items = items;
      },
    };
    store = new Vuex.Store({
      state,
      mutations
    });
  });

  it('renders items', () => {
    const wrapper = shallowMount(Results, { store, localVue });
    chai.expect(wrapper.contains('img')).to.be.false;
    store.commit('setItems', { items: [
        {"images":{"original":{"url": "http://url/to/image-1.jpg"}}},
        {"images":{"original":{"url": "http://url/to/image-2.jpg"}}},
    ]});
    chai.expect(wrapper.findAll('img').length).to.equal(2);
  });

  it('renders searching message on search', () => {
    const wrapper = shallowMount(Results, { store, localVue });
    chai.expect(wrapper.contains('.message')).to.be.false;
    store.commit('setIsSearching', { isSearching: true});
    chai.expect(wrapper.contains('.message')).to.be.true;
    chai.expect(wrapper.find('.message').text()).contains("Searching");
  });

  it('renders oops message on error', () => {
    const wrapper = shallowMount(Results, { store, localVue });
    chai.expect(wrapper.contains('.message')).to.be.false;
    store.commit('setError', { error: {}});
    chai.expect(wrapper.contains('.message')).to.be.true;
    chai.expect(wrapper.find('.message').text()).contains("Oops");
  });
});
