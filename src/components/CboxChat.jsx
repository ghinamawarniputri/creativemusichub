import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../style/cbox.css";

const CboxChat = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const buttonText = {
        ID: "Chat Box",
        EN: "Chat Box",
        SD: "Kotak Obrolan"
    };

    return (
        <div className="cbox-wrapper">
            {!isOpen ? (
                <button 
                    className="cbox-toggle-btn"
                    onClick={toggleChat}
                >
                    <FontAwesomeIcon icon={faComments} className="me-2" />
                    {buttonText[language]}
                </button>
            ) : (
                <div className="cbox-container">
                    <div className="cbox-header">
                        <button 
                            className="close-btn"
                            onClick={toggleChat}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <iframe 
                        src="https://www5.cbox.ws/box/?boxid=955690&boxtag=baDN8b" 
                        width="100%" 
                        height="450" 
                        allowTransparency="yes" 
                        allow="autoplay" 
                        frameBorder="0" 
                        marginHeight="0" 
                        marginWidth="0" 
                        scrolling="auto"
                    />
                </div>
            )}
        </div>
    );
};

export default CboxChat;
