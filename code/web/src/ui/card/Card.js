// Imports
import React from 'react'

// UI Imports
import { level1 } from '../common/shadows'

// Component
const Card = (props) => {
  const { children, ...other } = props

  return (
    <div {...other}>
      {children}

      {/* language=CSS */}
      <style jsx>{`
        div {
          border-radius: 0.2em;
          font-family: 'Roboto', sans-serif;
          box-shadow: ${ level1 };
        }
        `}
      </style>
    </div>
  )
}

export default Card

// ANNOTATION: This Card Component may be how we will get our StyleSurvey images to show up on the style survey page,
// and maintain a similar look and feel to all other images in APP