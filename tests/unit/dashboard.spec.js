import { shallow, createLocalVue, mount } from "@vue/test-utils";
import DashboardView from "../../src/views/Dashboard/DashboardView.vue";
import { createStore } from "vuex";
import authModule from '../../src/store/modules/auth';
import collaboratorModule from '../../src/store/modules/collaborator';
import itemsModule from '../../src/store/modules/item';
import configModule from '../../src/store/modules/config';


describe("DashboardView.vue", () => {
    let mockedIncFn
    let store
    beforeEach(() => {
        mockedIncFn = jest.fn()
        store = createStore({
          });
    })
    it("Caso nenhum item cadastrado retorna mensagem para cadastrar.", () => {
      const wrapper = mount(DashboardView, {
        global: { plugins: [store] },
      });
  
      expect(wrapper.text()).toMatch(
        "Ainda não há items cadastrados no sistema - Realizar novo cadastro"
      );
    });
});