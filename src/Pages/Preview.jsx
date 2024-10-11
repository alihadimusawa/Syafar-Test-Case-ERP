import React from "react";
import Header from "../components/Header";
import BigButton from "../components/BigButton";
import { useNavigate, useLocation } from "react-router-dom";
import "./Preview.css";
import exampleImage from '../assets/example.png';

function Preview() {
    const navigate = useNavigate();
    const location = useLocation();
    const { listOfSample, id } = location.state || {}; // Get the state passed from Homepage

    let currentSample = listOfSample ? listOfSample.find(sample => sample.id === id) : null;

    function homepageRedirect() {
        console.log("Homepage Redirect");
        navigate("/homepage");
    }

    function deleteCurrentSample(id) {
        // Navigate to Homepage and pass the id and delete function
        navigate("/homepage", { state: { id } });
    }

    function logout() {
        navigate("/");
    }

    return (
        <div>
            <Header homepage={false} logout={logout} />

            {currentSample ? (
                <div className="previewSampleContainer">
                    <h3>Sampel untuk kesuburan tanah</h3>

                    <div className="preview">
                        <div className="left">

                            <img src={exampleImage} alt="Example Image" id="exampleImage" />

                            <div className="location part">
                                <h3 className="head">Sample take location</h3>
                                <h3>
                                    {currentSample.kotaPengambilan}, {currentSample.negaraPengambilan}: {currentSample.titikPengambilan}
                                </h3>
                            </div>
                        </div>

                        <div className="right">
                            <div className="part">
                                <h3 className="head">Input Date:</h3>
                                <h3>{currentSample.tanggalInput}</h3>
                            </div>

                            <div className="part">
                                <h3 className="head">Client Name:</h3>
                                <h3>{currentSample.namaClient}</h3>
                            </div>

                            <div className="part">
                                <h3 className="head">Sample Title:</h3>
                                <h3>{currentSample.judulSampel}</h3>
                            </div>

                            <div className="part">
                                <h3 className="head">Sample Type:</h3>
                                <h3>{currentSample.jenisSampel}</h3>
                            </div>

                            <div className="part">
                                <h3 className="head">Sample Weight:</h3>
                                <h3>{currentSample.beratSampel}</h3>
                            </div>

                            <div className="part">
                                <h3 className="head">Weight Unit:</h3>
                                <h3>{currentSample.unitSatuan}</h3>
                            </div>

                            <div className="part">
                                <h3 className="head">Test Purpose:</h3>
                                <h3>{currentSample.tujuanUji}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="buttonBottomContainer">
                        <BigButton
                            text="Back"
                            onClick={homepageRedirect}
                        />
                        <BigButton
                            text="Edit"
                            onClick={(() => {
                                deleteCurrentSample(id);
                            })}
                        />
                        <BigButton
                            text="Delete"
                            onClick={() => {
                                deleteCurrentSample(id);
                            }}
                        />
                    </div>
                </div>
            ) : (
                <h3>No sample found</h3>
            )}
        </div>
    );
}

export default Preview;
