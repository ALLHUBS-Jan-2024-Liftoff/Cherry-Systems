import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CategoryMenu.css';

export function CategoryMenu() {
    const [categoriesList, setCategoriesList] = useState({});
    const [isDropdownDisplayed, setIsDropDownDisplayed] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(
        // categoriesList.reduce((obj, category) => ({...obj, [category.id]: false}), []) 
    );

    console.log('selectedCategories', selectedCategories);

    const loadCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/category/all');

            const data = response.data;
            const allCategoriesArr = [];

            for (let i in data) {
                allCategoriesArr.push(data[i]);             
            }

            const keyValuePairCategories = allCategoriesArr.reduce((obj, category) => (
                {...obj, [ category.id ]: false}
            ), {});

            setSelectedCategories(keyValuePairCategories);

            console.log(allCategoriesArr);
            return allCategoriesArr;
        } catch (error) {
            console.error("Error loading categories list from database!");
            throw error;
        }
    }

    useEffect(() => {
        loadCategories().then(setCategoriesList);
    }, []);

    return (
        <>
            <fieldset className='category-dropdown-div'>
                <div 
                    className='category-dropdown'
                    onClick={() => setIsDropDownDisplayed((prevState) => !prevState)}>
                    ---select categories---
                </div>
                {isDropdownDisplayed && <div className='panel'>
                    {categoriesList.map((category) => (
                        <fieldset key={category.id}>
                            <input
                                onChange={(e) => setSelectedCategories({
                                    [category.id]: e.target.checked,
                                })}
                                checked={selectedCategories[category.id]}
                                id={`input-${category.id}`} type='checkbox'/>
                            <label 
                                htmlFor={`input-${category.id}`}
                                className='category-dropdown-option'
                            >
                                    {category.name}
                            </label>
                        </fieldset>
                    ))}
                </div>}
            </fieldset>
        </>
    )
}
