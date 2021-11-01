import { useState, useEffect } from 'react';

import Head from 'next/head';
import cardData from '@/data/card-data';
import Card from '@/components/Card';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => shuffleCards(), []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.name === choiceTwo.name) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === choiceOne.name ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <>
      <Head>
        <title>Memory Card Game</title>
      </Head>
      <div className="flex flex-col items-center h-screen gap-10 py-6 bg-black">
        <h1 className="my-4 text-4xl text-white">Memory Card Game</h1>
        <button
          className="px-4 py-2 text-white transition duration-150 ease-in-out border-2 rounded-md hover:bg-gray-700"
          onClick={shuffleCards}
        >
          New Game
        </button>

        <div className="grid max-w-screen-md grid-cols-3 grid-rows-3 gap-4 sm:grid-cols-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              data={card}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
              onClick={handleChoice}
            />
          ))}
        </div>

        <p className="text-white">Turns: {turns}</p>
      </div>
    </>
  );
}
