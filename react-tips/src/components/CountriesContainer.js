import React, { Fragment, useState, useEffect, useRef, useReducer } from 'react';
import CountryCard from './CountryCard';
import getAllCountries from "./../calls/countries.js"
import AdvancedFilter from "./AdvancedFilter.js"
import "./CountriesContainer.css";

const CountriesContainer = () => {
    const [ countries, setCountries] = useState([]);
    // We need to see if component is mounted. We use useRef to create a 
    // mutable reference object whose .current property is initialized
    // to the passed argument (initialValue).
    const componentIsMounted = useRef(true);

    /* usereducer takes a function (called reducer) that determines how 
    react will update your state given the new state 
    that was passed into the function
    
    This reducer accepts a newState  and spreads the values 
    defined onto our original state object, which returns 
    state with the properties properly updated.

    The properties we have defined on our filterInput are 
    name, ca[ital and population which are initialized 
    in the second argument of useReducer.
    */
    const [filterInput, setFilterInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: "",
            capital: "",
            population: ""
        }
    );


    useEffect(() => {
        getAllCountries()
            .then(response => {
                if(componentIsMounted.current){
                    setCountries(response)
                }
            })
            .catch(err => {
                console.log(err);
            });
            // THis is a cleanup function, that resets component back 
            // to where it originall was
            return () => {
                componentIsMounted.current = false;
            }
    }, []);
    // the empty array here will ensure the resetted state will be a empty array


    /* In this function, we declare two variables, name and newValue, which are
    assigned to the corresponding name and value of the arrival event. 
    Then we store them in the state accordingly. */
    const handleFilterCountries = event => {
        const name = event.target.name;
        const newValue = event.target.value;
        // or use the desructured version
        // const { name, value } = event.target
        setFilterInput({ [name]: newValue });
        console.log(filterInput)
    };

    const filterCountries = list => {
    // We use Array.filter() method, which returns countries matching all the criteria.
    // This function returns only countries that match the filter inputs of name and capital and population (using logicial
    // operators && ). The filter is not case-semnstive.
        return list.filter(item => {
    // name and capital data are converted to lowercase (to include all items regardkless of lower- or uppercase)
    // These data are checked if they are included in the inputs of the filter. If they are, the result is true
            return (
                item.name
                    .toLowerCase()
                    .includes(
                        filterInput.name.toLowerCase()
                    ) &&
                item.capital
                    .toLowerCase()
                    .includes(
                        filterInput.capital.toLowerCase()
                    ) &&
            // Data of the population is checked if it’s equal or bigger than the value in the filter input
                item.population >= filterInput.population
            );
        });
    };

    const countriesList = filterCountries(countries); //passing countries state as an argument 

    return (
        <Fragment>
            <AdvancedFilter 
                searchValue={filterInput}
                handleChangeValue={handleFilterCountries}
            />
            <div className="countries-container">
                {countriesList.map(country => {
                    return <CountryCard key={country.numericCode} country={country} />
                })}
            </div>
        </Fragment>
    )
}

export default CountriesContainer;