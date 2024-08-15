import React, { useState } from 'react'

export default function CategoryBadges(props) {
    let data = props;

    let categoriesArr = data.props;

    return (
        <>
            {categoriesArr.map((category) => (
                <span key={category.id}>
                    <span id="bootstrapBadges" class="badge rounded-pill">{category.name}</span>
                </span>
            ))}
        </>
    )
}
