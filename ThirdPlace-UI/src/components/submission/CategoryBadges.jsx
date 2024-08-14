import React from 'react'

export default function CategoryBadges(props) {

    let data = props;

    let categoriesArr = data.props.categories;
    console.log(categoriesArr);

    let bootstrapBadgesColors = [
        "badge rounded-pill text-bg-primary",
        "badge rounded-pill text-bg-secondary",
        "badge rounded-pill text-bg-success",
        "badge rounded-pill text-bg-danger",
        "badge rounded-pill text-bg-warning",
        "badge rounded-pill text-bg-info",
        "badge rounded-pill text-bg-dark"
    ];
    
    let randomColor = bootstrapBadgesColors[Math.floor(Math.random() * bootstrapBadgesColors.length)];

    return (
        <>
            {categoriesArr.map((category) => (
                <span key={category.id}>
                    <span id="bootstrapBadges" class={randomColor}>{category.name}</span>
                </span>
            ))}
        </>
    )
}
