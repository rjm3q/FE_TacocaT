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

      {/* <h1>Hello {user.displayName}! </h1>
      <Link href="/critics/newCritic" passHref>
        <Button>Create a Critic</Button>
      </Link>
      <Link href="/tacos/newTaco" passHref>
        <Button>Create a Taco</Button>
      </Link> */}

      <div className="d-flex flex-wrap">
        {cards.map((card) => (
          <BigFoodCard key={card.firebaseKey} foodObj={card} onUpdate={getAllCards} />
        ))}
      </div>
    </div>
  );
}

export default Home;
