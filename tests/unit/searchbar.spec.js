import chai from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);


describe('SearchBar.vue', () => {
  let actions;
  let mutations;
  let store;

  beforeEach(() => {
    actions = {
      search: chai.spy()
    };
    mutations = {
      setQuery: chai.spy()
    };
    store = new Vuex.Store({
      actions,
      mutations
    });
  });

  it('renders props.msg as input placeholder', () => {
    const msg = 'a message';
    const wrapper = shallowMount(SearchBar, {
      propsData: { msg }
    });
    chai.expect(wrapper.find('input').attributes()["placeholder"]).to.equal(msg);
  });

  it('updates the store on user input', () => {
    const query = "kittens";
    const wrapper = shallowMount(SearchBar, { store, localVue });
    const input = wrapper.find('input');
    input.element.value = query;
    input.trigger('input');
    chai.expect(mutations.setQuery).to.have.been.called.with({query});
  });

  it('sends the search action on user submit', () => {
    const wrapper = shallowMount(SearchBar, { store, localVue });
    const button = wrapper.find('button');
    button.trigger('click');
    chai.expect(actions.search).to.have.been.called();
  });
});
