import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SampleSummary from "../components/SampleSummary";
import { useNavigate, useLocation } from "react-router-dom";
import "./Homepage.css";

var count = 1;

function Homepage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isExportVisible, setIsExportVisible] = useState(false);

    const [listOfSample, setListOfSample] = useState(() => {
        // Load the saved samples from LocalStorage or use default if none exist
        const savedSamples = localStorage.getItem("samples");
        return savedSamples ? JSON.parse(savedSamples) : [
            {
                id: count,
                tanggalInput: "12/03/2004",
                namaClient: "PT Syafar Media",
                judulSampel: "Sampel untuk kesuburan tanah",
                jenisSampel: "Tanah",
                beratSampel: "12",
                unitSatuan: "Kg",
                tujuanUji: "Uji asam",
                kotaPengambilan: "Jakarta",
                titikPengambilan: "-6.2146,106.8451",
                negaraPengambilan: "Indonesia"
            }
        ];
    });

    // Save the list of samples to LocalStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("samples", JSON.stringify(listOfSample));
    }, [listOfSample]);

    function getCurrentDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function addToSample(client, title, type, weight, unit, purpose, image) {
        let tempDate = getCurrentDate();
        count++;
        setListOfSample((preValue) => [
            ...preValue,
            {
                id: count,
                tanggalInput: tempDate,
                namaClient: client,
                judulSampel: title,
                jenisSampel: type,
                beratSampel: weight,
                unitSatuan: unit,
                tujuanUji: purpose,
                image: image // Store the image URL
            }
        ]);
    }
    

    function addSampleRedirect() {
        console.log("Add Sample redirect");
        navigate("/addSample");
    }

    function deleteSample(id) {
        setListOfSample((preValue) => preValue.filter((sample) => sample.id !== id));
    }

    useEffect(() => {
        const { id } = location.state || {};
        if (id) {
            deleteSample(id);
        }

        const { sampleData } = location.state || {};
        if (sampleData) {
            addToSample(
                sampleData.clientName,
                sampleData.title,
                sampleData.sampleType,
                sampleData.weight,
                sampleData.weightUnit,
                sampleData.purpose
            );
        }
    }, [location.state]);

    function changeAdmin() {
        setIsExportVisible(!isExportVisible);
    }

    function previewRedirect(id) {
        navigate("/preview", { state: { listOfSample, id } });
    }

    function logout() {
        navigate("/");
    }

    return (
        <div className="page">
            <Header changeAdmin={changeAdmin} logout={logout} homepage={true} />
            <div className="homepage">
                <h1>Take Sample</h1>
                {listOfSample.map((sample, index) => (
                    <SampleSummary
                        key={index}
                        number={index + 1}
                        inputDate={sample.tanggalInput}
                        clientName={sample.namaClient}
                        sampleTitle={sample.judulSampel}
                        isExportVisible={isExportVisible}
                        previewRedirect={previewRedirect}
                        id={sample.id}
                        deleteSample={deleteSample}
                    />
                ))}
                <button className="addButton" onClick={addSampleRedirect}>
                    <img src="../src/assets/plus.png" alt="plus icon" />
                </button>
            </div>

            {console.log(listOfSample)};
        </div>
    );
}

export default Homepage;
