import React from "react";

function SampleSummary({ number, inputDate, clientName, sampleTitle, isExportVisible, previewRedirect, id, deleteSample }) {
    return (
        <div className="sampleSummary">
            <h3>{number}.</h3>

            <div className="part">
                <p className="head">Input Date:</p>
                <p>{inputDate}</p>
            </div>

            <div className="part">
                <p className="head">Client Name:</p>
                <p>{clientName}</p>
            </div>

            <div className="part">
                <p className="head">Sample Title:</p>
                <p>{sampleTitle}</p>
            </div>

            <div className="buttonContainer">
                <div className="left" id="left">
                    <button onClick={() => {previewRedirect(id)}}>Preview</button>
                    <button className="export" style={{ visibility: isExportVisible ? 'visible' : 'hidden' }}>Export as CSV</button>
                </div>
                <div className="right">
                    <button>Edit</button>
                    <button onClick={(() => {deleteSample(id)})}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default SampleSummary;
