import React from 'react';

const Rank = ({ name, entries, clickname }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name} ==> ${clickname}, friend's interaction count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;