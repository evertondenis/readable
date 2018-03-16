export const types = {
  UPDATE_FORM_TITLE: 'POST/UPDATE_FORM_TITLE',
  UPDATE_FORM_BODY: 'POST/UPDATE_FORM_BODY'
}

export const actions = {
  updateFormTitle: text => ({ type: types.UPDATE_FORM_TITLE, text }),
  updateFormBody: text => ({ type: types.UPDATE_FORM_BODY, text })
}
