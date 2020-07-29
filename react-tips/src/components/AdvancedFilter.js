import React from 'react';
import "./AdvancedFilter.css";

const AdvancedFilter = ({ searchValue, handleChangeValue }) => (
    /* SearchValue is reated by the filterInput state in countriesContainer component.

        In each <input>, we must add the attribute name with values that match
        the properties in the reducer object (in <COuntriesContainer />) 
        we've implented earlier.

        
    */
    <form className="filter-container">
        <input 
            data-testid="filter-input-name"
            type="text"
            name="name"
            // An attribute value has the properties of Searchvalue object
            value={searchValue.name}
            // An attribute onChange in each input is calling handleChangeValue
            // with the event as an argument
            onChange={(e) => handleChangeValue(e)}
            placeholder="country"
            className="filter-input"
            autoFocus
        />
        <input 
            data-testid="filter-input-capital"
            type="text"
            name="capital"
            className="filter-input"
            placeholder="capital"
            value={searchValue.capital}
            onChange={(e)=> handleChangeValue(e)}
        />
        <input 
            data-testid="filter-input-population"
            type="number"
            min="0"
            name="population"
            className="filter-input"
            placeholder="population"
            value={searchValue.population}
            onChange={(e)=> handleChangeValue(e)}
        />
    </form>
)

export default AdvancedFilter;