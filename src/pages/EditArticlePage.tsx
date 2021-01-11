import React from 'react';
import servicesApi from '../services/servicesAPI';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArticlePostForm from '../components/ArticlePostForm';
import { ISlug } from '../types/interfaces';

const EditArticlePage: React.FC<ISlug> = ({ match }): JSX.Element => {
  let history = useHistory();

  const { user } = useSelector((state: any) => state.isAuthentication);

  const { params }: any = match;
  const onSubmit = (data: any) => {
    const api = new servicesApi();
    const { title, description, text } = data;
    const result = {
      article: {
        title,
        description,
        body: text,
      },
    };
    api
      .changeRequest(result, user.token, 'PUT', `articles/${params.slug}`)
      .then((data) => history.push('/articles'))
      .catch((e) => console.log(e));
  };
  return (
    <ArticlePostForm submit={onSubmit} legend='Edit Post' postTags={null} />
  );
};

export default EditArticlePage;
