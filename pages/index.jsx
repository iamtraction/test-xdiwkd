/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Section from "../components/Section";
import TemplateCard from "../components/Card";
import TemplateElement from "../components/Element";

import { updateTemplates } from "../state/reducers/home";
import { getTemplates, setTemplates } from "../utils/storage";
import generateID from "../utils/generateID";

const IndexPage = () => {
    const dispatch = useDispatch();
    const { templates } = useSelector(state => state.home);

    const [ selectedTemplate, setSelectedTemplate ] = useState(null);

    // create a new form template
    const createTemplate = () => {
        const template = {
            id: generateID(),
            name: "Untitled Form",
        };

        const newTemplates = templates.slice();
        newTemplates.unshift(template);

        setTemplates(newTemplates);
        dispatch(updateTemplates(newTemplates));
        setSelectedTemplate(template);
    };

    // delete the form template
    const deleteTemplate = (index) => {
        const newTemplates = templates.slice();
        const [ deletedTemplate ] = newTemplates.splice(index, 1);

        dispatch(updateTemplates(newTemplates));
        if (selectedTemplate && selectedTemplate.id === deletedTemplate.id) {
            setSelectedTemplate(null);
        }

        // save forms
        setTemplates(newTemplates);
    };

    // save changes to the selected template to storage
    const saveTemplate = () => {
        if (!selectedTemplate) return;

        const newTemplates = templates.slice();
        const modifiedTemplateIndex = templates.findIndex(t => t.id === selectedTemplate.id);

        newTemplates[modifiedTemplateIndex] = selectedTemplate;

        // save form templates
        dispatch(updateTemplates(newTemplates));
        setTemplates(newTemplates);
    };

    // select a form template
    const selectTemplate = (index) => {
        setSelectedTemplate(templates[index]);
    };

    // update the selected form template's name
    const updateFormName = (name) => {
        setSelectedTemplate({
            ...selectedTemplate,
            name,
        });
    };

    // add the specified component
    const addComponent = (type) => {
        if (!selectedTemplate) return;

        const template = Object.assign({}, selectedTemplate);

        if (!template.components) template.components = [];

        template.components.push({
            type,
            title: "",
        });

        setSelectedTemplate(template);
    };

    // delete the specified component
    const deleteComponent = (index) => {
        if (!selectedTemplate) return;

        const template = Object.assign({}, selectedTemplate);

        if (!template.components) return;

        template.components.splice(index, 1);

        setSelectedTemplate(template);
    };

    // set title of the specified component
    const setComponentTitle = (index, title) => {
        if (!selectedTemplate) return;

        const template = Object.assign({}, selectedTemplate);
        if (template.components && template.components.length) {
            template.components[index].title = title;
        }

        setSelectedTemplate(template);
    };

    // set options of the specified checkbox or dropdown component
    const setComponentOptions = (index, options) => {
        if (!selectedTemplate) return;

        const template = Object.assign({}, selectedTemplate);
        if (template.components && template.components.length) {
            template.components[index].options = options.split(",").map(o => o.trim()).filter(o => o);
        }

        setSelectedTemplate(template);
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
                title="Templates"
                description="Select the templates you want to edit or create a new one."
            >
                <button
                    style={{ marginBottom: 15 }}
                    onClick={ createTemplate }
                >
                    Create Form
                </button>

                {
                    templates.map((form, i) =>
                        <TemplateCard
                            key={ i }
                            name={ form.id || "Untitled Form" }
                            selected={ selectedTemplate && selectedTemplate.id === form.id }
                            clickHandler={ () => selectTemplate(i) }
                            deleteHandler={ () => deleteTemplate(i) }
                        />
                    )
                }
            </Section>

            <Section
                title="Editor"
                description="Select a template on the left or create a new one to edit it."
            >
                {
                    selectedTemplate && selectedTemplate.id && (
                        <div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 15,
                                color: "#aaa",
                            }}>
                                <div>{ selectedTemplate.name }</div>
                                <div
                                    style={{
                                        color: "orangered",
                                        cursor: "pointer",
                                    }}
                                    onClick={ saveTemplate }
                                >
                                    Save
                                </div>
                            </div>

                            <div>
                                {
                                    selectedTemplate && selectedTemplate.components && selectedTemplate.components.map((component, i) =>
                                        <div
                                            key={ i }
                                            style={{
                                                marginBottom: 10,
                                                padding: 15,
                                                backgroundColor: "#222",
                                            }}
                                        >
                                            <div style={{
                                                marginBottom: 10,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                color: "#aaa",
                                                textTransform: "uppercase",
                                            }}>
                                                <div style={{ fontSize: ".8em" }}>
                                                    { component.type }
                                                </div>
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={ () => deleteComponent(i) }
                                                >
                                                    ✖️
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Title..."
                                                value={ component.title }
                                                onChange={ e => setComponentTitle(i, e.target.value) }
                                            />
                                            {
                                                [ "checkbox", "dropdown" ].includes(component.type) && (
                                                    <input
                                                        type="text"
                                                        placeholder="Options (comma separated)..."
                                                        defaultValue={ component.options && component.options.join(", ") }
                                                        onChange={ e => setComponentOptions(i, e.target.value) }
                                                        style={{ marginTop: 15 }}
                                                    />
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </Section>

            <Section
                title="Components"
                description="Select the components you want to add to the form"
            >
                {
                    selectedTemplate && selectedTemplate.id && [ "Text", "Email", "Dropdown", "Checkbox" ].map((comp, i) =>
                        <TemplateElement
                            key={ i }
                            name={ comp }
                            clickHandler={ addComponent }
                        />
                    )
                }
            </Section>
        </div>
    );
};

export default IndexPage;
