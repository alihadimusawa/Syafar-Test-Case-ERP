import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import BigButton from '../components/BigButton';
import "./addSample.css";

function AddSample() {
    const navigate = useNavigate();

    // Inside AddSample component
    const location = useLocation(); // Get the location object
    const { addSample } = location.state || {}; // Destructure addSample from location.state
    
    function handleSubmit() {
        if (addSample) {
            // Call the passed addSample function
            addSample(
                sampleData.clientName,
                sampleData.title,
                sampleData.sampleType,
                sampleData.weight,
                sampleData.weightUnit,
                sampleData.purpose
            );
            navigate("/homepage"); // Redirect back to homepage after submission
        } else {
            alert("Error: addSample function not found.");
        }
    }
    
    const [image, setImage] = useState(null); // State to store the uploaded image
    const [sampleData, setSampleData] = useState({
        clientName: "PT Guugle", // Default option
        title: "",
        sampleType: "Soil", // Default option
        weight: "",
        weightUnit: "kg", // Default option
        purpose: ""
    });

    function homepageRedirect() {
        navigate("/homepage");
    }

    function logout() {
        navigate("/");
    }

    // Function to handle image upload
    function handleImageUpload(event) {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }

    // Function to submit the sample and call addSample from the location state
    function handleSubmit() {
        if (addSample) {
            addSample(
                sampleData.clientName,
                sampleData.title,
                sampleData.sampleType,
                sampleData.weight,
                sampleData.weightUnit,
                sampleData.purpose
            );
            navigate("/homepage"); // Redirect back to homepage after submission
        } else {
            alert("Error: addSample function not found.");
        }
    }

    // Function to handle changes in the form inputs
    function handleInputChange(event) {
        const { name, value } = event.target;
        setSampleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                            <option value="PT Guugle">PT Guugle</option>
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
    )
}

export default AddSample;
