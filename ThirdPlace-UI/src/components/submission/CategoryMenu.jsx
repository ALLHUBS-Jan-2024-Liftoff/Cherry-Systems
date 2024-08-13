import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const CategoryMenu = () => {
    const [categoriesList, setCategoriesList] = useState("");

    const loadCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/category/all');
 
            const data = response.data;
            const allCategoriesArr = [];

            for(let i in data) {
                allCategoriesArr.push(data [i]);
            }

            console.log(allCategoriesArr);
            setCategoriesList(allCategoriesArr);
            return categoriesList;
        } catch (error) {
            console.error("Error loading categories list from database!");
            throw error;
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const categoryOptions = () => {
        categoriesList.map((category) => ( <p>{category}</p>
        // <div>
        //     {category.name}
        // </div>
    ))}

    return (
        <div className='dropdown'>
            <label className='dropdown-label'>Select Categories</label>

            <div className='dropdown-list'>
                <label className='dropdown-option'>
                    <input type='checkbox' name='dropdown-group' value={1}/>
                    Category with id: 1
                </label>
            </div>
            <div className='dropdown-list'>
                <label className='dropdown-option'>
                    <input type='checkbox' name='dropdown-group' value={2}/>
                    Category with id: 2
                </label>
            </div>
            <div className='dropdown-list'>
                <label className='dropdown-option'>
                    <input type='checkbox' name='dropdown-group' value={3}/>
                    Category with id: 3
                </label>
            </div>
            <div className='dropdown-list'>
                <label className='dropdown-option'>
                    <input type='checkbox' name='dropdown-group' value={4}/>
                    Category with id: 4
                </label>
            </div>
        </div>
    )
}
