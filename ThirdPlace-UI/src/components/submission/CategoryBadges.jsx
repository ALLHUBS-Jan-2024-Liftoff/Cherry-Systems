import React from 'react'

export default function CategoryBadges(props) {

    let data = props;

    let categoriesArr = data.props.categories;
    console.log(categoriesArr);

    return (
        <>
            {categoriesArr.map((category) => (
                <span key={category.id}>
                    <span class="badge rounded-pill text-bg-success">{category.name}</span>
                </span>
            ))}
        </>
    )
}
