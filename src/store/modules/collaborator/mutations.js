import { useAxios } from "../../../hooks";

const { axios } = useAxios();

const UPDATE_COLLABORATOR_LOCAL_STORAGE = async (state) => {
  try {
    const res = await axios.get("http://localhost:3004/collaborators") ||
      [];
    state.collaborators = res.data;
    return res.data;
  } catch (error) {
    throw new Error("Erro ao obter atualizar colaboradores");
  }
};

const REGISTER_COLLABORATOR = async (state, payload) => {
  try {
    const res = await axios.post("http://localhost:3004/collaborators", payload);
    state.collaborators.push(res.data);
    return res.data;
  } catch (error) {
    throw new Error("Erro ao registrar colaborador");
  }
};

const EDIT_COLLABORATOR = async (state, payload) => {
  try {
    const res = await axios.put(`http://localhost:3004/collaborators/${payload.id}`, payload);
    return res.data;
  } catch (error) {
    throw new Error("Erro ao editar colaborador");
  }
};

export {
  UPDATE_COLLABORATOR_LOCAL_STORAGE,
  REGISTER_COLLABORATOR,
  EDIT_COLLABORATOR
};
