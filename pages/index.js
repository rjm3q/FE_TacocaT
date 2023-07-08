import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTacos } from '../api/tacoData';
import LilFoodCard from '../components/LilFoodCard';

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
    <div className="text-center d-flex flex-column justify-content-center align-items-center">
      <h1
        style={{
          fontFamily: 'Arial',
          fontSize: '48px',
          fontVariant: 'small-caps',
          color: 'red',
        }}
      >
        Hello {user.displayName}!
      </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="mr-2">
          <Link href="/critics/newCritic" passHref>
            <Button className="home-page-btn">Create a Critic</Button>
          </Link>
        </div>
        <div className="ml-2">
          <Link href="/tacos/newTaco" passHref>
            <Button className="home-page-btn">Create a Taco</Button>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {cards.map((lilTaco) => (
          <LilFoodCard key={lilTaco.firebaseKey} foodObj={lilTaco} onUpdate={getAllCards} />
        ))}
      </div>
    </div>
  );
}

export default Home;
