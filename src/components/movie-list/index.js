import React, {useState} from "react";
import renderList from '../list-items';
import "./index.css";

export default function MovieList() {

  // const [MoviesList, setMoviesList] = useState(null);
  const [Year, setYear] = useState('');
  // const [Pagination, setPagination] = useState(1);
  // const [pagers, setpagers] = useState(1);
  const [AllItems, setAllItems] = useState(null);
  let Timer = null;

  const callApi = (year) => {    
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAJNCWDx273TeHECuJKxXWP0rJ8-hGqRGM&cx=018264299595958242005:dvoe66zacxy&q=${year}`)
    .then(res => res.json())
    .then(response => {
      if (response && response.items) {
        
        const total = Math.ceil(response.items.length / 3);
        const pagersList = [];
        for (let i = 1; i <= total; i++) {
          pagersList.push(i);
        }
        // setpagers(pagersList);
        setAllItems(response.items);   
        // setAllItems(response.items);
      }
    });
  };

  const changeYear = (event) => {
    setYear(event.target.value);

    clearTimeout(Timer);
    Timer = setTimeout((year) => {      
      callApi(year);
    }, 1000, event.target.value);
  }



  // const changePager = (index) => {
  //   setPagination(index);
  //   // setAllItems(AllItems.slice(index, 3));
  // }

  

  // const renderPagination = (i, index) => {
  //   return (<span key={index} className={ i === Pagination ? 'selected' : 'normal'  } onClick={changePager(i)}>{i}</span>);
  // }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" value={Year} onChange={changeYear}/>
        {/* <button className="" data-testid="submit-button" onClick={callApi}>Search</button> */}
      </section>

      <ul className="mt-50 styled" data-testid="movieList">
        {AllItems && AllItems.length > 0 && AllItems.map(renderList)}
      </ul>

      {AllItems && AllItems.length < 1 && <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found!</div>}
      {/* {AllItems && AllItems.length > 0 && <div>
        {pagers.map(renderPagination)}
      </div>} */}
    </div>
  );
}
