import './App.css';
import {useState} from 'react';
import Header from './Header';
import List from './List';

const URL = 'http://localhost/shop/'

function App() {
const [searchCriteria, setSearchCriteria] = useState(null);

function search(criteria) {
  setSearchCriteria(criteria);
}
  return (
    <>
      <Header search={search} />
      <List URL={URL} criteria={searchCriteria}/>
    </>
  );
}

export default App;
