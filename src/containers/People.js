import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Person from '../components/Person';
import '../syles/People.css';

const People = () => {
  const [people, setPeople] = useState([]);
  const [number, setNumber] = useState(12);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url = `https://randomuser.me/api/?results=${number}&seed=abc&page=${pageNo}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPeople([...data.results]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setPeople([]);
        setisError(true);
      });
  }, [number, pageNo]);

  const handlePrevious = () => {
    if (pageNo >= 2) {
      setPageNo(pageNo - 1);
    }
    return;
  };
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };
  return (
    <div className="center">
      <h2>People data</h2>
      <div className="filter">
        <select onChange={(e) => setNumber(e.target.value)}>
          <option value="100">100</option>
          <option value="50">50</option>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
          <option value="1">1</option>
        </select>
      </div>
      <h4>Page Number: {pageNo}</h4>
      {isLoading ? <Loading /> : ''}
      {isError ? (
        <div className="loading-cont">Sorry error fetching the data</div>
      ) : (
        ''
      )}
      <div className="people-container">
        {people.map((person) => (
          <Person person={person} key={person.login.uuid} />
        ))}
      </div>
      <div className="pagination">
        <button
          className="previous"
          type="button"
          onClick={handlePrevious}
          disabled={pageNo === 1 ? true : false}
        >
          Previous
        </button>
        <button className="next" type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default People;
