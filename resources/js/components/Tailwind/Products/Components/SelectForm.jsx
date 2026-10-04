import { Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SelectForm = ({
    options = [],
    placeholder = "Select an option",
    onChange,
    valueKey,
    labelKey,
    label,
    labelClass,
    className = "customtext-neutral-dark   rounded-full ",
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef(null);

    // Detectar si `options` es un array de strings o de objetos
    const isArrayOfObjects =
        options.length > 0 && typeof options[0] === "object";

    // Si `options` es un array de strings, usamos valores predeterminados
    const computedValueKey = isArrayOfObjects
        ? valueKey || Object.keys(options[0])[0]
        : null;
    const computedLabelKey = isArrayOfObjects
        ? labelKey || Object.keys(options[0])[1]
        : null;

    // Convertir todas las opciones a un formato uniforme { value, label }
    const normalizedOptions = options.map(
        (option) =>
            isArrayOfObjects
                ? {
                      value: option[computedValueKey],
                      label: option[computedLabelKey],
                  }
                : { value: option, label: option } // Si es un string, lo usamos como value y label
    );

    // Filtrar opciones por búsqueda
    const filteredOptions = normalizedOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={selectRef}>
            {label && (
                <label
                    className={`block text-sm mb-1 customtext-neutral-dark ${labelClass}`}
                >
                    {label}
                </label>
            )}
            <button
                className={`w-full relative text-start  px-4 py-1 font-normal border border-[#FF9900] focus:ring-0 focus:outline-0 font-dmsans text-base xl:text-lg  transition-all duration-300  text-[#FF9900] ${className}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                disabled={disabled}
            >
                <span className="block truncate">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="absolute  fill-[#5F48B7] inset-y-0 right-2 flex items-center justify-center py-3 pr-2 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-4 h-4 fill-current"
                    >
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-4 h-4 fill-current"
                    >
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-[100] w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1 text-[13px]" role="listbox">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                className={`px-4 py-2 cursor-pointer flex items-center justify-between 
                                    ${
                                        selectedOption &&
                                        selectedOption.value === option.value
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                onClick={() => handleSelect(option)}
                                role="option"
                                aria-selected={
                                    selectedOption &&
                                    selectedOption.value === option.value
                                }
                            >
                                <span className="block truncate">
                                    {option.label}
                                </span>
                                {selectedOption &&
                                    selectedOption.value === option.value && (
                                        <Check className="w-5 h-5" />
                                    )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectForm;
