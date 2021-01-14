import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/actions/actions';
import storageCollector from '../services/storageCollector';
import Header from '../components/Header';
import PagesContainer from './PagesContainer';
import 'antd/dist/antd.css';
import './AppContainer.sass';

const AppContainer: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const storageData = storageCollector();

  useEffect(() => {
    if (storageData) {
      dispatch(setUserData(storageData));
    }
  }, [dispatch, storageData]);

  const mainStyle = {
    width: '1400px',
    margin: '0 auto',
    maxWidth: '90%',
  };
  const headerStyle = {
    backgroundColor: 'white',
    padding: '0 60px',
  };

  return (
    <div className="app">
      <Router>
        <nav className="app__header" style={headerStyle}>
          <Header />
        </nav>
        <main className="app__main" style={mainStyle}>
          <PagesContainer />
        </main>
      </Router>
    </div>
  );
};

export default AppContainer;
