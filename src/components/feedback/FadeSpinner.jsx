import React from 'react'
import FadeLoader  from 'react-spinners/FadeLoader '

const FadeSpinner = () => {
  return (
    <div className="flex justify-center	justify-items-center items-center">
      <FadeLoader  loading={true} color='#f1802e' />
    </div>
  )
}

export default FadeSpinner