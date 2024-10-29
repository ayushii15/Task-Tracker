import React from 'react';
import '../styles/Popup.css';

function Popup({ message, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Popup;
