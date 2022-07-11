import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ListingItem = ( { info, id } ) => {
  return (
    <div className="card" style={{width: '18rem'}}>
        <img src={info.carImages[0]} className="card-img-top w-auto" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{info.manufacturer}</h5>
            <p className="card-text">{info.location}</p>
            <Link to={`/category/${info.type}/${id}`} className="btn btn-primary">Go somewhere</Link>
        </div>
    </div>
  )
}

export default ListingItem