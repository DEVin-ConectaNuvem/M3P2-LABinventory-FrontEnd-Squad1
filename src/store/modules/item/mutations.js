import { useAxios } from "../../../hooks";

const UPDATE_ITEMS_LOCAL_STORAGE = async (state) => {
  try {
    const res =
      (await useAxios().axios.get("http://localhost:3000/items")) || [];
    state.items = res.data;
    return res.data;
  } catch (error) {
    throw new Error("Erro ao obter atualizar itens");
  }
};

const REGISTER_ITEM = (state, payload) => {
  try {
    const res = useAxios().axios.post("http://localhost:3000/items", payload);
    state.items.push(res.data);
    return res.data;
  } catch (error) {
    throw new Error("Erro ao registrar item");
  }
};

const EDIT_ITEM = (state, payload) => {
  try {
    const res = useAxios().axios.put(
      `http://localhost:3000/items/${payload.id}`,
      payload
    );
    return res.data;
  } catch (error) {
    throw new Error("Erro ao editar item");
  }
};

const SET_LOAN_ITEM = (state, payload) => {
  try {
    const res = useAxios().axios.patch(
      `http://localhost:3000/items/${payload.id}`,
      { collaborator: payload.collaborator, loanAt: payload.loanAt }
    );
    return res.data;
  } catch (error) {
    throw new Error("Erro ao emprestar item");
  }
};

export {
  UPDATE_ITEMS_LOCAL_STORAGE,
  REGISTER_ITEM,
  EDIT_ITEM,
  SET_LOAN_ITEM,
};
