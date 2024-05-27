// src/LikeButton.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Button variant="link" onClick={toggleLike} className="like-button">
      <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} color={liked ? 'red' : 'grey'} />
    </Button>
  );
};

export default LikeButton;
