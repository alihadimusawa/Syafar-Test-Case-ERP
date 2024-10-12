import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BigButton from '../components/BigButton';
import "./addSample.css";

function AddSample() {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [sampleData, setSampleData] = useState({
        clientName: "PT Guugle",
        title: "",
        sampleType: "Soil",
        weight: "",
        weightUnit: "kg",
        purpose: ""
    });

    function handleImageUpload(event) {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file));
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setSampleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit() {
        navigate("/homepage", { state: { sampleData } }); // Pass the sampleData to Homepage
    }

    function homepageRedirect() {
        navigate("/homepage");
    }

    function logout() {
        navigate("/");
    }

    return (
        <div>
            <Header homepage={false} logout={logout}></Header>
            <div className='addSample'>
                <h1>Add your sample</h1>
                <div className='addSampleContainer'>
                    <div className='sampleLeft'>
                        <p>Client Name</p>
                        <select id="clientName" name="clientName" onChange={handleInputChange} value={sampleData.clientName}>
                            <option valaue="PT Guugle">PT Guugle</option>
                            <option value="PT Shapee">PT Shapee</option>
                            <option value="PT Warungpedia">PT Warungpedia</option>
                        </select>

                        <p>Sample Title</p>
                        <input type="text" placeholder='ex: Sample untuk kesuburan tanah' id='title' name='title' value={sampleData.title} onChange={handleInputChange} />

                        <p>Sample Type</p>
                        <select id="sampleType" name="sampleType" value={sampleData.sampleType} onChange={handleInputChange}>
                            <option value="Soil">Soil</option>
                            <option value="Water">Water</option>
                            <option value="Air">Air</option>
                        </select>

                        <p>Sample Weight</p>
                        <input type="text" placeholder='ex: 12' id='weight' name='weight' value={sampleData.weight} onChange={handleInputChange} />

                        <p>Weight Units</p>
                        <select id="weightUnit" name="weightUnit" value={sampleData.weightUnit} onChange={handleInputChange}>
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="mg">mg</option>
                        </select>

                        <p>Test Purpose</p>
                        <input type="text" name="purpose" id="purpose" value={sampleData.purpose} placeholder='Write the purpose of this sample test' onChange={handleInputChange} />
                    </div>

                    <div className='sampleRight'>
                        <p>Upload Image</p>
                        <input type="file" onChange={handleImageUpload} />
                        {image && (
                            <div className="imagePreview">
                                <img src={image} alt="Uploaded Sample" width="200px" />
                            </div>
                        )}
                    </div>
                </div>

                <div className='buttonBottomContainer'>
                    <BigButton text="back" onClick={homepageRedirect} />
                    <BigButton text="submit" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default AddSample;
