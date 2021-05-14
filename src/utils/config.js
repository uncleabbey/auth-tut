const config = {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}` || '',
  },
};

export default config;
