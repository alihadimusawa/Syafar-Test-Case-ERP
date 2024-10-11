import React, { useEffect, useState } from "react"; // Import useEffect
import Header from "../components/Header";
import SampleSummary from "../components/SampleSummary";
import { useNavigate, useLocation } from "react-router-dom";
import "./Homepage.css";

var count = 1;

function Homepage() {
    const navigate = useNavigate();
    const location = useLocation(); // Use location to get state
    const [isExportVisible, setIsExportVisible] = useState(false);

    const [listOfSample, setListOfSample] = useState([
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
    ]);

    function deleteSample(id) {
        setListOfSample((preValue) => {
            return preValue.filter((sample) => sample.id !== id);
        });
    }

    // Use useEffect to check for id in location state
    useEffect(() => {
        const { id } = location.state || {};
        if (id) {
            deleteSample(id); // Call deleteSample if id exists
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

                <button className="addButton">
                    <img src="../src/assets/plus.png" alt="" />
                </button>
            </div>
        </div>
    );
}

export default Homepage;
