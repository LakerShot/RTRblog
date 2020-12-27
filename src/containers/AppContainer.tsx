import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUserData } from '../actions/actions';
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

  return (
    <div className='container'>
      <Router>
        <Header />
        <PagesContainer />
      </Router>
    </div>
  );
};

export default AppContainer;
