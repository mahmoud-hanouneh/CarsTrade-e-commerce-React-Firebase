import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'


const ScaleSpinner = () => {
  return (
    <div className="flex justify-center	justify-items-center items-center">
        <ScaleLoader loading={true} color='#f1802e' width={3} />
    </div>
  )
}

export default ScaleSpinner