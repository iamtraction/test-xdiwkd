/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

export const TEMPLATES_KEY = "templates";
export const SUBMISSIONS_KEY = "submissions";

export const getItem = (key) => {
    try {
        let data = window.localStorage.getItem(key);
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const setItem = (key, data) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(e);
    }
};


export const getTemplates = () => getItem(TEMPLATES_KEY) ?? [];
export const setTemplates = (templates) => setItem(TEMPLATES_KEY, templates);


export const getSubmissions = () => getItem(SUBMISSIONS_KEY) ?? [];
export const addSubmission = (record) => {
    let records = getItem(SUBMISSIONS_KEY);
    if (records && records.length) records.push(record);
    else records = [ record ];
    setItem(SUBMISSIONS_KEY, records);
};
export const setSubmissions = (submissions) => setItem(SUBMISSIONS_KEY, submissions);
