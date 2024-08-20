import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function FavoriteButton({ submissionId }) {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  // Fetch initial favorite status
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!user) return;
      
      try {
        const response = await axios.get(`http://localhost:8080/api/favorites/user/${user.id}`);
        const favorites = response.data;
        const favorite = favorites.find(fav => fav.submission.id === submissionId);
        if (favorite) {
          setIsFavorited(true);
          setFavoriteId(favorite.id);
        } else {
          setIsFavorited(false);
          setFavoriteId(null);
        }
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    fetchFavoriteStatus();
  }, [user, submissionId]);

  // Function to toggle favorite status
  const handleFavoriteToggle = async () => {
    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    try {
      if (isFavorited && favoriteId !== null) {
        // Remove favorite
        await axios.delete(`http://localhost:8080/api/favorites/delete/${favoriteId}`);
        setIsFavorited(false);
        setFavoriteId(null);
        console.log('Favorite removed');
      } else {
        // Add favorite
        const response = await axios.post('http://localhost:8080/api/favorites/new', {
          user: { id: user.id },
          submission: { id: submissionId }
        });
        setFavoriteId(response.data.id); // Update with the new favorite ID
        setIsFavorited(true);
        console.log('Favorite added');
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  return (
    <button onClick={handleFavoriteToggle}>
      {isFavorited ? 'Unfavorite' : 'Add to Favorites'}
    </button>
  );
}
