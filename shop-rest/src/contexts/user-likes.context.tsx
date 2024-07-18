import React, { ReactNode, createContext, useState } from 'react';

export type LikedCard = {
  user_id: number;
  liked_by: number;
};

type AppContextType = {
  likedCards: LikedCard[];
  addLikedCard: (card: LikedCard) => void;
  removeLikedCard: (card: LikedCard) => void;
};

const AppContext = createContext<AppContextType>({
  likedCards: [],
  addLikedCard: () => {},
  removeLikedCard: () => {},
});

type UserCardLikesProviderProps = {
  children?: ReactNode;
};

const UserCardLikesProvider: React.FC<UserCardLikesProviderProps> = ({ children }) => {

  console.log('liked card provider', );
  
  const [likedCards, setLikedCards] = useState<LikedCard[]>([]);

  const addLikedCard = (card: LikedCard) => {
    console.log('liked card added',card )
    setLikedCards((prevLikedCards) => [...prevLikedCards, card]);
  };

  const removeLikedCard = (card: LikedCard) => {
    console.log('liked card removed',card )
    setLikedCards((prevLikedCards) =>
      prevLikedCards.filter(
        (prevCard) => prevCard.user_id !== card.user_id || prevCard.liked_by !== card.liked_by
      )
    );
  };

  return (
    <AppContext.Provider value={{ likedCards, addLikedCard, removeLikedCard }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, UserCardLikesProvider };
