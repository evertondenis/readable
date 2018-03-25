export const types = {
  UPDATE_FORM_TITLE: 'POST/UPDATE_FORM_TITLE',
  UPDATE_FORM_AUTHOR: 'POST/UPDATE_FORM_AUTHOR',
  UPDATE_FORM_BODY: 'POST/UPDATE_FORM_BODY',
  UPDATE_FORM_CATEGORY: 'POST/UPDATE_FORM_CATEGORY',
  UPDATE_FORM_CLEAN: 'POST/UPDATE_FORM_CLEAN'
}

export const actions = {
  updateFormTitle: text => ({ type: types.UPDATE_FORM_TITLE, text }),
  updateFormAuthor: text => ({ type: types.UPDATE_FORM_AUTHOR, text }),
  updateFormBody: text => ({ type: types.UPDATE_FORM_BODY, text }),
  handlerOnChange: option => ({ type: types.UPDATE_FORM_CATEGORY, option }),
  cleanForm: () => ({ type: types.UPDATE_FORM_CLEAN })
}
