import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { getTacos } from '../../api/tacoData';
import LilFoodCard from '../../components/LilFoodCard';

function Home() {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();

  const getAllCards = () => {
    getTacos(user.uid).then(setCards);
  };

  useEffect(() => {
    getAllCards();
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <div className="d-flex flex-wrap">
        {cards.map((card) => (
          <LilFoodCard key={card.firebaseKey} foodObj={card} onUpdate={getTacos} />
        ))}
      </div>
    </div>
  );
}

export default Home;
