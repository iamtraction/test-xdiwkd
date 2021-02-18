/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

/* Intial State */
const initialState = {
    selectedTemplate: {},
    templates: [],
};


/* Action Types */
const UPDATE_SELECTED_TEMPLATE = "UPDATE_SELECTED_TEMPLATE";
const UPDATE_TEMPLATES = "UPDATE_TEMPLATES";


/* Action Creators */
export const updateSelectedTemplate = (template) => ({ type: UPDATE_SELECTED_TEMPLATE, payload: template });
export const updateTemplates = (templates) => ({ type: UPDATE_TEMPLATES, payload: templates });


/* Reducer */
const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case UPDATE_SELECTED_TEMPLATE:
        return { ...state, selectedTemplate: payload };

    case UPDATE_TEMPLATES:
        return { ...state, templates: payload };

    default:
        return state;
    }
};

export default reducer;
