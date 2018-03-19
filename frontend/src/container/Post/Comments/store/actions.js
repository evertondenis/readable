export const types = {
  UPDATE_FORM_AUTHOR: 'POST/UPDATE_FORM_AUTHOR',
  UPDATE_FORM_BODY: 'POST/UPDATE_FORM_BODY',
  UPDATE_FORM_CLEAN: 'POST/UPDATE_FORM_CLEAN'
}

export const actions = {
  updateFormAuthor: text => ({ type: types.UPDATE_FORM_AUTHOR, text }),
  updateFormBody: text => ({ type: types.UPDATE_FORM_BODY, text }),
  cleanForm: () => ({ type: types.UPDATE_FORM_CLEAN })
}
