import '../Filter/Filter.css';

const Filter = ({ value, onChange }) => (
  <label>
    Фильтр по-имени
    <input type="text" value={value} onChange={onChange}></input>
  </label>
);

export default Filter;
