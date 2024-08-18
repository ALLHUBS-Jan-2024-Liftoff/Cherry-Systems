import React from 'react'

export default function CategoryBadges(props) {
    let data = props;

    let categoriesArr = data.props.categories;

    return (
        <>
            {categoriesArr.map((category) => (
                <span key={category.id}>
                    <span id="bootstrapBadges" className="badge rounded-pill">{category.name}</span>
                </span>
            ))}
        </>
    )
}
