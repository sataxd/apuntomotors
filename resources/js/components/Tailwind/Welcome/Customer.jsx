import { useEffect, useState, useRef } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import Marquesina from "./Marquesina";

const generalRest = new GeneralRest();

const Customer = ({brands, apiFolder}) => {
    const [Benefits, setBenefits] = useState(null);
    const [Toallas, setToallas] = useState(null);
    const [Soles, setSoles] = useState(null);
    
    const [activeImage, setActiveImage] = useState(1);
    const handleToggleImage = () => {
        setActiveImage(prev => prev === 1 ? 2 : 1);
    };

    useEffect(() => {
        // ... (Tu lógica de fetch se mantiene igual)
        const fetchBenefits = async () => {
            try {
                const data = await generalRest.getBenefits();
                setBenefits(data);
            } catch (error) {
                console.error("Error fetching benefits:", error);
            }
        };
        fetchBenefits();
    }, []);
    
    return (

        <div className="relative overflow-hidden">
            <Marquesina brands={brands} apiFolder={apiFolder} />
        </div>
    );
};

export default Customer;
