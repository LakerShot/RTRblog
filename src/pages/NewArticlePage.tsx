import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import servicesApi from '../services/servicesAPI';
import ArticlePostForm from '../components/ArticlePostForm';
import { BlogState } from '../types/interfaces';

const NewArticlePage: React.FC = (): any => {
  const history = useHistory();
  const { user } = useSelector((state: BlogState) => state.isAuthentication);
  const { articlesPostTags } = useSelector((state: BlogState) => state);

  const onSubmit = (data: any) => {
    const api = new servicesApi();
    const { title, description, text } = data;
    const result = {
      article: { title, description, body: text, tagList: articlesPostTags },
    };
    api
      .changeRequest(result, user.token, 'POST', `articles`)
      .then((data) => history.push('/articles'))
      .catch((e) => console.log(e));
  };
  return <ArticlePostForm submit={onSubmit} legend="Create New Post" postTags={null} />;
};

export default NewArticlePage;
