import React from 'react';
import { Link } from 'react-router-dom';

const NoAccess = () => {
  return (
    <div className="text-center">
      <h1 className="text-danger">Sorry you do not have to this page</h1>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NoAccess;
