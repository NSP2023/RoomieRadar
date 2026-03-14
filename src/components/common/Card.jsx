import React from 'react'

const Card = ({ children, className = '', hover = true, padding = 'medium', ...props }) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  }
  
  return (
    <div
      className={`card ${hover ? 'hover:card-hover' : ''} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card