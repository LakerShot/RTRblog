import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Result } from 'antd';
import ArticlesListPage from '../pages/ArticlesListPage';
import ArticlePage from '../pages/ArticlePage';
import AuthPage from '../pages/AuthPage';
import RegPage from '../pages/RegPage';
import ProfilePage from '../pages/ProfilePage';
import NewArticlePage from '../pages/NewArticlePage';
import EditArticlePage from '../pages/EditArticlePage';
import PrivateRoute from '../helpers/PrivateRoute';
import DefaultRoute from '../helpers/DefaultRoute';

const PagesContainer: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <DefaultRoute path="/" component={ArticlesListPage} exact />
      <Route path="/sign-in" component={AuthPage} />
      <Route path="/sign-up" component={RegPage} />
      <Route path="/articles" component={ArticlesListPage} exact />
      <Route path="/articles/:slug" component={ArticlePage} exact />
      <PrivateRoute path="/profile" component={ProfilePage} exact />
      <PrivateRoute path="/new-article" component={NewArticlePage} />
      <PrivateRoute path="/articles/:slug/edit" component={EditArticlePage} exact />
      <Route render={() => <Result status="404" title="404" subTitle="Sorry, this page does not exist :(" />} />
    </Switch>
  );
};

export default PagesContainer;
