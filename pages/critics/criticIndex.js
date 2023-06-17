import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import BigFoodCard from '../../components/BigFoodCard';
import { getCritics } from '../../api/criticData';

function Home() {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();

  const getAllCards = () => {
    getCritics(user.uid).then(setCards);
  };

  useEffect(() => {
    getAllCards();
  }, []);

  return (
    <div
      className="d-flex flex-wrap justify-content-center align-content-center"
    >
      <div className="d-flex flex-wrap">
        {cards.map((card) => (
          <BigFoodCard key={card.firebaseKey} foodObj={card} onUpdate={getCritics} />
        ))}
      </div>
    </div>
  );
}

export default Home;
