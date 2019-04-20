import React from 'react';

const CardList = ({robots, handleClick}) => { 
    return (
      <div classname='rows'>
        {
          robots.map((item, i) => (
            <li className = 'tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5' key={i} onClick={() => handleClick(item.name)} >
              <div>
                <img alt='robots' src={`https://robohash.org/${item.id}?size=200x200`} />
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.email}</p>
                  <p>Click Me</p>
                </div>
              </div>
            </li> 
        ))}
      </div>  
    );
}  

export default CardList;
/*const CardList = ({ robots, onSubmitIdea }) => {
  return (
    <div>
      {
        robots.map((user, i) => {
          return (
            <Card
              key={i}
              id={robots[i].id}
              name={robots[i].name}
              email={robots[i].email}
              onSubmitIdea={onSubmitIdea}
              />
          );
        })
      }
    </div>
  );
}*/

