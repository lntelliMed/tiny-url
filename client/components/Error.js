import React from 'react';

const error = (props) => {
  return (
    <section className="error">
      <h1>{`Oops, something went wrong. ${props.error}`}</h1>
    </section>
  );
};

export default error;
