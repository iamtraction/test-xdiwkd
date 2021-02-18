/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Section from "../components/Section";
import TemplateCard from "../components/Card";

import { updateTemplates } from "../state/reducers/home";
import { getTemplates, addSubmission } from "../utils/storage";

const FormsPage = () => {
    const dispatch = useDispatch();
    const { templates } = useSelector(state => state.home);

    const [ selectedForm, setSelectedForm ] = useState(null);
    const [ record, setRecord ] = useState([]);

    // select the specified form for entering data
    const selectForm = (index) => {
        // TODO: text fields data aree shared upon selectionn?
        setSelectedForm(templates[index]);
        setRecord(templates[index].components ? templates[index].components.map(c => ({ q: c.title, a: "" })) : []);
    };

    // set answer for the specified component of the form
    const setComponentAnswer = (index, answer) => {
        if (!selectedForm) return;

        const newRecord = record;
        if (newRecord && newRecord.length) {
            newRecord[index].a = answer;
        }

        setRecord(newRecord);
    };

    // save the form responses
    const saveForm = () => {
        addSubmission({
            form: {
                id: selectedForm.id,
                name: selectedForm.name,
            },
            responses: record,
            date: Date.now(),
        });
    };

    useEffect(() => {
        // get form templates from storage and cache it
        dispatch(updateTemplates(getTemplates()));
    }, []);

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
        }}>
            <Section
                title="Forms"
                description="Select the form you want to fill."
            >
                {
                    templates.map((form, i) =>
                        <TemplateCard
                            key={ i }
                            name={ form.id }
                            selected={ selectedForm && selectedForm.id === form.id }
                            clickHandler={ () => selectForm(i) }
                        />
                    )
                }
            </Section>

            <Section
                title="Details"
                description={ selectedForm ? selectedForm.id : "Select a form on the left to fill and submit." }
                style={{ flex: 2 }}
            >
                {
                    selectedForm && (
                        <div>
                            {
                                selectedForm.components && selectedForm.components.map((component, i) =>
                                    <div
                                        key={ i }
                                        style={{
                                            marginBottom: 10,
                                            padding: 15,
                                            backgroundColor: "#222",
                                        }}
                                    >
                                        <div style={{ marginBottom: 10 }}>
                                            { component.title }
                                        </div>
                                        {
                                            component.type === "dropdown"
                                            ?   <select onChange={ e => setComponentAnswer(i, e.target.value) }>
                                                    <option value="">Select</option>
                                                    {
                                                        component.options && component.options.map((option, i) =>
                                                            <option key={ i } value={ option }>{ option }</option>
                                                        )
                                                    }
                                                </select>
                                            :   component.type === "checkbox"
                                                ?   component.options && component.options.map((option, j) =>
                                                        <div
                                                            key={ j }
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                marginBottom: 5,
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={ j }
                                                                name={ component.title }
                                                                value={ option }
                                                                onChange={ e => setComponentAnswer(i, e.target.value) }
                                                            />
                                                            <label htmlFor={ j }>{ option }</label>
                                                        </div>
                                                    )
                                                :   <input
                                                        type={ component.type }
                                                        placeholder="Type something..."
                                                        onChange={ e => setComponentAnswer(i, e.target.value) }
                                                    />
                                        }
                                    </div>
                                )
                            }

                            <button onClick={ saveForm }>Submit</button>
                        </div>
                    )
                }
            </Section>
        </div>
    );
};

export default FormsPage;
