import React, { useState } from 'react';
import { X } from 'lucide-react';

const Message = ({ message, variant = "success", visible, onClose = () => {} }) => {
    const [isVisible, setIsVisible] = useState(visible);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (!isVisible) return null;

    const bgColor = variant === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700";

    return (
        <div className={`${bgColor} p-4 rounded mb-4 relative`}>
            <button
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                onClick={handleClose}
            >
                <X size={16} />
            </button>
            {message}
        </div>
    );
};

export default Message;