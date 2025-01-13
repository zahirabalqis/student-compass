import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/feedback", {
                feedback,
            });
            setMessage(response.data.message);
            setFeedback("");
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Submit Feedback</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
            <textarea
    value={feedback}
    onChange={(e) => setFeedback(e.target.value)}
    placeholder="Write your feedback here about Student Compass, building facilities & etc..."
    required
    style={{ width: '100%', height: '150px', padding: '10px', fontSize: '16px' }}
/>
                <br /><br />
                <button type="submit">Submit</button>
            </form>
            <br></br>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Feedback;
