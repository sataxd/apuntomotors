import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AlertComponent = ({
    message,
    actionLabel,
    onAction,
    duration = 5000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(false), duration);
        return () => clearTimeout(timeout);
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    const handleAction = () => {
        if (onAction) onAction();
        // navigate("/carrito");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed md:bottom-10 md:left-10 bottom-4 left-4 right-4 
                bg-[#FF9900] text-white px-4 py-3 md:px-6 md:py-5 rounded-lg 
                md:rounded-xl shadow-xl flex items-center justify-between 
                space-x-2 md:space-x-4 z-[9999] max-w-[90vw] lg:w-max mx-auto"
                >
                    <span className="flex-grow text-sm md:text-base max-w-[200px] md:max-w-none truncate">
                        {message}
                    </span>

                    <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                        {actionLabel && (
                            <a
                                href="/checkout"
                                className="bg-[#000] text-white px-3 py-2 
                            md:px-4 md:py-3 text-sm md:text-base rounded-lg
                            md:rounded-xl shadow hover:bg-[#000] 
                            transition-colors whitespace-nowrap"
                            >
                                {actionLabel}
                            </a>
                        )}

                        <button
                            onClick={handleClose}
                            className="bg-red-600 hover:bg-red-700 p-2 
                        md:p-3 text-white rounded-lg md:rounded-xl 
                        transition-colors"
                        >
                            <X size={18} className="md:w-5 md:h-5 w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AlertComponent;
