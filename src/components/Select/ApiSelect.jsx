import AsyncSelect from "react-select/async";

export default function ApiSelect({ id, name, getOptions, handleChange }) {
    
    function handleChangeSelect(e) {
        handleChange({
            target: {
                name,
                value: e ? e.value : "",
            },
        });
    }

    return (
        <AsyncSelect
            id={id}
            name={name}
            cacheOptions
            loadOptions={getOptions}
            //onInputChange={handleInputSelectChange}
            isClearable={true}
            //defaultOptions
            onChange={handleChangeSelect}
            ariaLabels={customAriaLabels}
            placeholder={customAriaLabels.selectPlaceholder}
            noOptionsMessage={() => customAriaLabels.noOptions}
            loadingMessage={() => customAriaLabels.loadingMessage}
            styles={styles}
        />
    );
}

const styles = {
    //Estiliza el contenedor del control del select
    control: (styles) => {
        //console.log(styles);
        return {
            ...styles,
            backgroundColor: "#212529",
            borderColor: "#495057",
            color: "#dee2e6",
        };
    },
    //Estiliza el menú desplegable
    menu: (styles) => ({
        ...styles,
        backgroundColor: "#212529",
        color: "#dee2e6",
    }),
    //Estiliza el placeholder
    placeholder: (styles) => {
        return {
            ...styles,
            color: "#dee2e6",
        };
    },
    //Estiliza cada opción en el menú desplegable
    option: (styles, state) => {
        return {
            ...styles,
            backgroundColor: state.onClick
                ? "grey"
                : state.isSelected
                ? "grey"
                : state.isFocused
                ? "black"
                : "#212529",
            color: "#dee2e6",
            cursor: "pointer",
        };
    },
    //Estiliza el valor seleccionado
    singleValue: (styles) => ({
        ...styles,
        color: "#dee2e6",
    }),
    //Estiliza el input para buscar
    input: (styles) => ({
        ...styles,
        color: "dee2e6",
    }),
};

const customAriaLabels = {
    clearValue: "Borrar valor",
    noOptions: "No hay opciones",
    loadingMessage: "Cargando...",
    inputPlaceholder: "Escribe aquí...",
    selectPlaceholder: "Buscar...",
};
