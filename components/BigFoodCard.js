import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleCritic } from '../api/criticData';

function BigFoodCard({ foodObj, onUpdate }) {
  const deleteThisCard = () => {
    // check foodObj.name
    if (window.confirm(`Delete ${foodObj.criticName}?`)) {
      deleteSingleCritic(foodObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{foodObj.criticName}</Card.Title>
        <p className="card-text bold">{foodObj.criticName}</p>
        <p className="card-text bold">{foodObj.desc}</p>
        <p className="card-text bold">{foodObj.createdDate}</p>
        <p className="card-text bold">{foodObj.rating}</p>
        <Link href={`/critics/${foodObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/critics/edit/${foodObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCard} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BigFoodCard.propTypes = {
  foodObj: PropTypes.shape({
    criticName: PropTypes.string,
    desc: PropTypes.string,
    taco_id: PropTypes.string,
    createdDate: PropTypes.instanceOf(Date),
    rating: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BigFoodCard;
