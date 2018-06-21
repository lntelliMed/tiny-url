import React from 'react';

const error = (props) => {
  console.log('---------->',props.error)
  return (
    <div className="error">
      <h1>{`Oops, something went wrong. ${props.error}`}</h1>
    </div>
  );
};

export default error;
