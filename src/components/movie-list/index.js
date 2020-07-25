import React, {useState, useEffect} from "react";
import renderList from '../list-items';
import data from './mock';
import "./index.css";

export default function MovieList() {

  const [MoviesList, setMoviesList] = useState(null);
  const [Year, setYear] = useState('');
  const [Pagination, setPagination] = useState(1);
  const [pagers, setpagers] = useState(1);
  const [AllItems, setAllItems] = useState(null);
  const limit = 5;
  let Timer = null;

  const callApi = (year) => {    
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAJNCWDx273TeHECuJKxXWP0rJ8-hGqRGM&cx=018264299595958242005:dvoe66zacxy&q=${year}`)
    .then(res => res.json())
    .then(response => {
      if (response && response.items) {
      init(response); 
      }
    });
  };

  const init = (response) => {
        const total = Math.ceil(response.items.length / limit);
        const pagersList = [];
        for (let i = 1; i <= total; i++) {
          pagersList.push(i);
        }
        setpagers(pagersList);
        setAllItems(response.items);   
        setMoviesList(response.items.slice(1, limit + 1));
  }

  const changeYear = (event) => {
    setYear(event.target.value);

    clearTimeout(Timer);
    Timer = setTimeout((year) => {      
      callApi(year);
    }, 1000, event.target.value);
  }

  useEffect(() => {
    return () => {
      clearTimeout(Timer);
    }
  }, []);



  const changePager = (index) => {
    const from = ((index -1) * limit);
    const to = (index === pagers.length) ? AllItems.length : from + limit;
    setMoviesList(AllItems.slice(from, to));
    setPagination(index);
  }

  

  const renderPagination = (i, index) => {
    return (<span key={index} className={ i === Pagination ? 'selected' : 'normal'  } onClick={e => changePager(i)}>{i}</span>);
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="Search" data-testid="app-input" value={Year} onChange={changeYear}/>
        {/* <button className="" data-testid="submit-button" onClick={callApi}>Search</button> */}
      </section>

      <ul className="mt-50 styled" data-testid="movieList">
        {MoviesList && MoviesList.length > 0 && MoviesList.map(renderList)}
      </ul>

      {AllItems && AllItems.length < 1 && <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found!</div>}
      {MoviesList && MoviesList.length > 0 && <div style={{margin: '20px'}}>
        {pagers.map(renderPagination)}
      </div>}
    </div>
  );
}
