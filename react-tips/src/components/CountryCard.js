import React from 'react';
import "./CountryCard.css";

const CountryCard = ({ country }) => {
    return (
        <div className="country-card">
            <h3>{country.name}</h3>
            <div className="country-info-cointainer">
                <h4>Capital:</h4>
                <p>{country.capital}</p>
                <li className="country-info-item">
                    <h4>Population:</h4>
                    <p>{country.population}</p>
                </li>
            </div>
            <div className="country-info-container">
                <img className="country-flag" src={country.flag} alt="country-flag"></img>
            </div>
        </div>
    )
}

export default CountryCard;