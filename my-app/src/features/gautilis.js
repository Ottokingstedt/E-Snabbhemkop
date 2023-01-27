import ReactGA from 'react-ga4';

 const initGA = (id) => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(id);
    }
  };

  export default initGA