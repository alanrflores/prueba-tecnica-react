import React, { useEffect, useState, useRef } from 'react';
const API_KEY = 'c09d01c';
import './style.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // const inputRef = useRef();
  //useRef --> permite crear una referencia mutable que persiste durante todo tu ciclo de vida de tu componente. es muy util para guardar cualquier valor que puedas mutar como identificador , como un elemento del dom, como un contador y que cada vez que cambia no vuelve a renderizar el componente , eso es diferente al useState que cuando cambia se vuelve a renderizar el componente

  const getMovie = (search) => {
    if (search) {
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const { search } = Object.fromEntries(new window.FormData(event.target));
    // console.log('search', value);
    getMovie(search);
  };
  const handleChange = () => {
    // const inputEl = inputRef.current
    // const value = inputEl.value
    // console.log('value', value)
    const newSearch = event.target.value;
    if (newSearch.startsWith(' ')) return;
    setSearch(event.target.value);

    if (search === '') {
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda tiene que tener al menos 3 caracteres.');
      return;
    }

    if (search.match(/^\d*\.?\d*$/)) {
      setError('No existe el titulo con numeros');
      return;
    }

    setError(null);
  };

  return (
    <div>
      <h1>Movies</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form action="" onSubmit={handleSubmit}>
          <input
            style={{ width: 300, heigth: 'auto' }}
            type="text"
            name="search"
            placeholder="Batman , Superman , The avengers..."
            value={search}
            onChange={handleChange}
          />
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <button type="submit">Buscar</button>
          </div>
        </form>
      </div>
      {error && (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ color: 'red' }}>{error}</span>
        </div>
      )}
      {movies.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>Aqui se mostraran los resultados de su búsqueda.</span>
        </div>
      ) : (
        <>
          <ul className="movies">
            {movies?.Search?.map((item) => (
              <li key={item.Title}>
                <h5>{item.Title}</h5>
                <p>{item.Year}</p>
                <img src={item.Poster} alt={item.Title} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Movies;
