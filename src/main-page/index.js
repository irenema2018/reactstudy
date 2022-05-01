import { useEffect, useState, useMemo } from 'react';  
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './main-page.css';
import Header from './header';
import FeaturedHouse from "./featured-house";

function App() {
  const [allHouses, setAllHouses] = useState([]); // when the component is rendered, allHouses is an empty array.

  useEffect (()=> {
    const fetchHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []); // empty array means only the function will be executed the first time the component gets rendered

  const featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses]);
  
  return (
    <Route>
      <div className="container">
        <Header subtitle="Providing houses all over the world"/>

        <Switch>
          <Route path="/">
            <FeaturedHouse house={featuredHouse}></FeaturedHouse>
          </Route>
        </Switch>
      </div>
    </Route>

    // <div className="container">
    //   <Header 
    //   subtitle="In progress" 
    //   />
    // </div>
  );
}

export default App;
