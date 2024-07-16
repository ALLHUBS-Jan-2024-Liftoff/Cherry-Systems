import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className='review-card'>
        404 Not Found

        <Link to="/">Back to Home Page</Link>
    </div>
  )
}
