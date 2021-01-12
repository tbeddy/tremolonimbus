export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (type, modalEntity) => {
  const entity = modalEntity || null;
  return {
    type: OPEN_MODAL,
    modal: {type, entity}
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}