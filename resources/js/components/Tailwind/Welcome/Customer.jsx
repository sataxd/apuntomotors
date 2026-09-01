import Marquesina from "./Marquesina";

const Customer = ({ brands, apiFolder }) => {
    return (
        <div className="relative overflow-hidden">
            <Marquesina brands={brands} apiFolder={apiFolder} />
        </div>
    );
};

export default Customer;