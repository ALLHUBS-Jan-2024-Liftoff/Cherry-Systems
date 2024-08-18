import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './CategoryMenu.css';

export function CategoryMenu({selectedCategories, setSelectedCategories}) {
    const [categoriesList, setCategoriesList] = useState({});
    const [isDropdownDisplayed, setIsDropDownDisplayed] = useState(false);

    const numberOfCategoriesSelected = Object.values(selectedCategories).filter(Boolean).length

    const dropdownRef = useRef(null);

    const dropdown = (e) => {
        e.stopPropagation();
        const onClick = (e) => {
            if(e.target !== dropdownRef.current) {
                setIsDropDownDisplayed(false);
            }
        };
        
        document.addEventListener('click', onClick);

        return () => {
            document.removeEventListener('click', onClick);
        };
    }

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
            <fieldset className='category-dropdown'>
                <div 
                    className='category-dropdown-div'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDropDownDisplayed((prevState) => !prevState);
                    }}
                >
                    {numberOfCategoriesSelected > 0 ? `${numberOfCategoriesSelected}  categories selected` : '---select categories---'}
                    {/* caret icons from heroicons.com */}
                    {!isDropdownDisplayed  ? (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5" 
                            />
                        </svg>
                    ) : (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="m4.5 15.75 7.5-7.5 7.5 7.5" 
                            />
                        </svg>
                    )}
                </div>
                {isDropdownDisplayed && 
                    <div
                        onClick={dropdown}
                        ref={dropdownRef}
                        className='panel'
                    >
                        {categoriesList.map((category) => (
                            <fieldset
                                key={category.id}
                                className={selectedCategories[category.id] ? 'selected' : ''}
                            >
                                <input
                                    onChange={(e) => setSelectedCategories({
                                        ...selectedCategories,
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
                    </div>
                }
            </fieldset>
        </>
    )
}
