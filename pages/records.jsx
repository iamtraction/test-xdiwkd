/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import { useEffect, useState } from "react";

import Section from "../components/Section";
import TemplateCard from "../components/Card";

import { getSubmissions, setSubmissions } from "../utils/storage";

const RecordsPage = () => {
    const [ records, setRecords ] = useState([]);
    const [ selectedRecord, setSelectedRecord ] = useState(null);

    // select the specified record for entering data
    const selectRecord = (index) => {
        setSelectedRecord(records[index]);
    };

    // delete the selected record
    const deleteRecord = (index) => {
        const newRecords = records.slice();
        const [ deletedTemplate ] = newRecords.splice(index, 1);

        setRecords(newRecords);
        if (selectedRecord && selectedRecord.date === deletedTemplate.date) {
            setSelectedRecord(null);
        }

        // save records
        setSubmissions(newRecords);
    };

    useEffect(() => {
        // get records from storage and cache it
        setRecords(getSubmissions());
    }, []);

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
        }}>
            <Section
                title="Records"
                description="Select the record you want to view."
            >
                {
                    records.map((record, i) =>
                        <TemplateCard
                            key={ i }
                            name={ record.form.id }
                            description={ new Date(record.date).toLocaleString() }
                            selected={ selectedRecord && selectedRecord.date === record.date }
                            clickHandler={ () => selectRecord(i) }
                            deleteHandler={ () => deleteRecord(i) }
                        />
                    )
                }
            </Section>

            <Section
                title="Details"
                description={ selectedRecord ? new Date(selectedRecord.date).toString() : "Select a record on the left to view it." }
                style={{ flex: 2 }}
            >
                {
                    selectedRecord && selectedRecord.responses.map((response, i) =>
                        <div
                            key={ i }
                            style={{
                                marginBottom: 10,
                                padding: 15,
                                backgroundColor: "#222",
                            }}
                        >
                            <div style={{ color: "lightgray" }}>
                                { response.q }
                            </div>
                            <div style={{
                                marginTop: 10,
                                color: "lightgray",
                                fontWeight: "bold",
                            }}>
                                { response.a }
                            </div>
                        </div>
                    )
                }
            </Section>
        </div>
    );
};

export default RecordsPage;
