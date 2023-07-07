import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTaco } from '../api/tacoData';

function LilFoodCard({ foodObj, onUpdate }) {
  const deleteThisCard = () => {
    // check foodObj.name
    if (window.confirm(`Delete ${foodObj.shopName}?`)) {
      deleteSingleTaco(foodObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{foodObj.shopName}</Card.Title>
        <p className="card-text bold">{foodObj.ownerName}</p>
        <p className="card-text bold">{foodObj.type}</p>
        <p className="card-text bold">{foodObj.address}</p>
        <Link href={`/tacos/${foodObj.firebaseKey}`} passHref>
          <Button variant="info" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/tacos/edit/${foodObj.firebaseKey}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCard} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

LilFoodCard.propTypes = {
  foodObj: PropTypes.shape({
    address: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    ownerName: PropTypes.string,
    shopName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default LilFoodCard;
