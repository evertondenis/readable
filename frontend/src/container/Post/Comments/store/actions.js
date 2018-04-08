export const types = {
  UPDATE_FORM_AUTHOR: 'POST/UPDATE_FORM_AUTHOR',
  UPDATE_FORM_BODY: 'POST/UPDATE_FORM_BODY',
  UPDATE_FORM_CLEAN: 'POST/UPDATE_FORM_CLEAN',
  OPEN_EDIT_MODAL: 'POST/OPEN_EDIT_MODAL'
}

export const actions = {
  updateFormAuthor: text => ({ type: types.UPDATE_FORM_AUTHOR, text }),
  updateFormBody: text => ({ type: types.UPDATE_FORM_BODY, text }),
  cleanForm: () => ({ type: types.UPDATE_FORM_CLEAN }),
  openEditModal: id => ({ type: types.OPEN_EDIT_MODAL, id })
}
