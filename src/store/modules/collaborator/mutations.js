import { useAxios } from "../../../hooks";

const UPDATE_COLLABORATOR_LOCAL_STORAGE = async (state) => {
  try {
    const res = (await useAxios().axios.get("http://localhost:3000/collaborators")) ||
      [];
    state.collaborators = res.data;
    return res.data;
  } catch (error) {
    throw new Error("Erro ao obter atualizar colaboradores");
  }
};

const SET_COLLABORATOR_LOCAL_STORAGE = (state) => {
  localStorage.setItem("collaborators", JSON.stringify(state.collaborators));
}

const REGISTER_COLLABORATOR = async (state, payload) => {
  try {
    const res = await useAxios().axios.post("http://localhost:3000/collaborators", payload);
    state.collaborators.push(res.data);
    return res.data;
  } catch (error) {
    console.log(error.message)
  }
};

const EDIT_COLLABORATOR = async (state, payload) => {
  try {
    const res = await useAxios().axios.put(`http://localhost:3000/collaborators/${payload.id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error.message)
  }
};

export {
  UPDATE_COLLABORATOR_LOCAL_STORAGE,
  REGISTER_COLLABORATOR,
  EDIT_COLLABORATOR,
  SET_COLLABORATOR_LOCAL_STORAGE
};
