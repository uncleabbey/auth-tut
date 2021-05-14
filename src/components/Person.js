const Person = (props) => (
  <div className="person">
    <img src={props.person.picture.large} alt={props.person.name.first} />
    <p>
      {props.person.name.title} {props.person.name.first}{' '}
      {props.person.name.last}
    </p>
  </div>
);

export default Person;
