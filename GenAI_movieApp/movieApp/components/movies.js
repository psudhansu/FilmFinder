import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';

const OMDB_API_KEY = 'YOUR_OMDB_API_KEY';

const Movie = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchQuery}`);
      const data = await response.json();
      if (data.Search) {
        setMovieResults(data.Search);
        setSelectedMovie(null); // Clear selected movie details when new search is performed
      } else {
        setMovieResults([]);
        setSelectedMovie(null);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movie Search</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter movie title..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Button title="Search" onPress={searchMovies} />
      </View>
      
      <ScrollView style={styles.resultsContainer}>
        {movieResults.map(movie => (
          <View key={movie.imdbID} style={styles.movieItem}>
            <Image source={{ uri: movie.Poster }} style={styles.poster} />
            <Text>{movie.Title}</Text>
            <Button title="Details" onPress={() => fetchMovieDetails(movie.imdbID)} />
          </View>
        ))}
      </ScrollView>

      {selectedMovie && (
        <View style={styles.detailsContainer}>
          <Image source={{ uri: selectedMovie.Poster }} style={styles.poster} />
          <Text style={styles.title}>{selectedMovie.Title}</Text>
          <Text>Year: {selectedMovie.Year}</Text>
          <Text>Plot: {selectedMovie.Plot}</Text>
          <Text>Rating: {selectedMovie.imdbRating}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  resultsContainer: {
    marginBottom: 20,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  poster: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Movie;
