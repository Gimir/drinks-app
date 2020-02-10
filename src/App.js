import React, { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import './App.css';
import endpoints from './api/endpoints';

import Header from './components/Header';
import BodyWrapper from './components/BodyWrapper';
import Filters from './components/Filters';
import Content from './components/Content';

function App() {
  //Filters set for the checkboxes
  const [filters, setFilters] = useState([]);
  //All categories and drinks
  const [drinks, setDrinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  //Filtered and paginated content that user sees
  const [currentContent, setCurrentContent] = useState([]);

  //Update content when page scrolled to the end
  //I see that this is unaccurate way to do updading 
  //but i hadn't mush time at the moment
  const updateContent = throttle(() => {
    let updating = true;
    if (window.scrollY === 75) updating = true;
    if ((window.scrollY + window.innerHeight) === document.body.clientHeight) {
      if (updating) {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setCurrentPage(prevPage => prevPage+1);
        updating = false;
      }
    };
  }, 1500);
  //Runs at the first render and fetches all categories
  //and drinks from api
  useEffect(()=> {
    setInitialState();
    window.addEventListener('scroll', updateContent);
    return () => {
      window.removeEventListener('scroll', updateContent);
    }
  }, []);
  //Checks the currentPage state and defines nex content
  useEffect(() => {
    //Check the last page and if true - return to the first one
    if (currentPage > 10) setCurrentPage(1);
    defineCurrentContent();
  }, [currentPage]);
  return (
    <div className="App">
      <Header />
      <BodyWrapper>
        <Filters filters={drinks.map(category => category.filter)} 
          applyFiltersHandler={applyFiltersHandler}
          toggleFilterHandler={toggleFilterHandler} 
        />
        <Content drinks={currentContent} />
      </BodyWrapper>
    </div>
  );
  
  //Set initial state at the first render
  async function setInitialState() {
    //To get access to the fetched filters at the nex chains
    let filtersArray; 
    fetch(endpoints.filters)
      .then(responce => responce.json())
      .then(array => {
        setFilters(array.drinks.map(filter => filter.strCategory));
        filtersArray = array.drinks;
        return array;
      })
      .then(categories => {
        const drinksPromises = [];
        for (let category of categories.drinks) {
          drinksPromises.push(fetch(endpoints.drinks(category.strCategory)));
        };
        return Promise.all(drinksPromises);
      })
      .then(drinksPromices => {
        return Promise.all(drinksPromices.map(prom => prom.json()));
      })
      .then(drinksArray => {
        const initialState = drinksArray.map((drinks, index) => {
          return {
            filter: filtersArray[index].strCategory,
            active: true,
            drinks: [
              ...drinks.drinks
            ]
          }
        });
        setDrinks(initialState);
      })
      .then(() => setCurrentPage(1))
      .catch(error => console.error(error));
  }
  //Sets currentContent according to the currentPage
  function defineCurrentContent() {
    //Get 10 items of each drinks array of each active category
    const paginate = (array, number) => {
      const perPage = 10;
      const result = array.slice((number * perPage) - perPage, number * perPage);
      return result.length === 0 ? null : result;
    }
    
    const content = [];
    for (let category of drinks) {
      if (filters.includes(category.filter)) {
        const cuttedDrinks = paginate(category.drinks, currentPage);
        if (cuttedDrinks) {
          content.push({
            filter: category.filter,
            active: true,
            drinks: [...cuttedDrinks]
          });
        }
      };
    }
    setCurrentContent(content);
  };
  //Apply button handler
  function applyFiltersHandler() {
    console.log(filters);
    setDrinks(state => {
      return state.map(category => {
        if (filters.includes(category.filter)) return {
          active: true,
          filter: category.filter,
          drinks: [...category.drinks]
        };
        else return {
          active: false,
          filter: category.filter,
          drinks: [...category.drinks]
        };
      });
    });
    defineCurrentContent();
  }
  //Checkbox onChange handler
  function toggleFilterHandler(e) {
    e.persist();
    setFilters(state => {
        if (e.target.checked) return [...state, e.target.value];
        else return state.filter(name => e.target.value !== name);
    });
  };
}
export default App;
