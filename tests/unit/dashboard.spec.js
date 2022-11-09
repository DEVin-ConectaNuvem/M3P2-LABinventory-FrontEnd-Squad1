import { shallowMount } from "@vue/test-utils";
import DashboardView from "../../src/views/Dashboard/DashboardView.vue";

describe("DashboardView.vue", () => {
    it("Caso nenhum item cadastrado retorna mensagem para cadastrar.", () => {
      const wrapper = shallowMount(DashboardView, {
        propsData: { itens: [] },
      });
  
      expect(wrapper.text()).toMatch(
        "Ainda não há items cadastrados no sistema - Realizar novo cadastro"
      );
    });
});