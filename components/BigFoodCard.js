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
    <Card className="big-food-card" style={{ width: '100%', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" />
        <Card.Title>{foodObj.criticName}</Card.Title>
        <p className="card-text bold">{foodObj.criticName}</p>
        <p className="card-text bold">{foodObj.desc}</p>
        <p className="card-text bold">{foodObj.createdDate}</p>
        <p className="card-text bold">{foodObj.rating}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-2rem' }}>
          <Link href={`/critics/${foodObj.firebaseKey}`} passHref>
            <Button variant="info" className="m-2">
              VIEW
            </Button>
          </Link>
          <Link href={`/critics/edit/${foodObj.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2">
              EDIT
            </Button>
          </Link>
          <Button variant="outline-danger" onClick={deleteThisCard} className="m-2">
            DELETE
          </Button>
        </div>
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
