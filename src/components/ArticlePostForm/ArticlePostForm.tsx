import React, { useState, useEffect } from 'react';

import { addArticleTag } from '../../actions/actions';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface IPostForm {
  submit: any;
  legend: string;
  postTags: string[] | null;
}

const ArticlePostForm: React.FC<IPostForm> = ({
  submit,
  legend,
  postTags,
}): JSX.Element => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const { register, handleSubmit, errors } = useForm();

  let uniqId = 100;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addArticleTag(tags));
  }, [dispatch, tags]);

  const onChangeTagValue = (e: any): void => {
    setValue(e.target.value);
  };

  const onSubmitNewTask = (e: any): void => {
    e.preventDefault();
    if (value && value.length < 20) {
      setTags((tag) => [value, ...tag]);
      setValue('');
    }
  };

  const removeTag = (e: any): void => {
    e.preventDefault();
    const itemId = e.target.getAttribute('data-id');
    const newArr = tags.filter((element, id) => id !== +itemId);
    setTags(newArr);
  };

  const createTags = () => {
    return tags.map((el, i) => {
      return (
        <li key={`${++uniqId}_${el}`}>
          <span>{el}</span>
          <button data-id={i} onClick={removeTag}>
            Delete
          </button>
        </li>
      );
    });
  };
  return (
    <div className='create-article'>
      <form onSubmit={handleSubmit(submit)}>
        <fieldset>
          <legend>{legend}</legend>
          <label htmlFor='title' className='create-article__label'>
            Title:
          </label>
          <input
            type='text'
            className='create-article__input'
            name='title'
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 100,
            })}
          />
          {errors.title && (
            <span className='no-valid'>
              Title must have at least from 4 to 100 characters
            </span>
          )}
          <label htmlFor='title' className='create-article__label'>
            Short Description:
          </label>
          <input
            type='text'
            className='create-article__input'
            name='description'
            ref={register({
              required: true,
              minLength: 10,
              maxLength: 250,
            })}
          />
          {errors.description && (
            <span className='no-valid'>
              Description must have at least from 10 to 250 characters
            </span>
          )}

          <label htmlFor='title' className='create-article__label'>
            Text:
          </label>
          <textarea
            className='create-article__input'
            name='text'
            ref={register({
              required: true,
              minLength: 50,
              maxLength: 4000,
            })}
          />
          {errors.text && (
            <span className='no-valid'>
              Text must have at least from 50 characters
            </span>
          )}
          <div className='create-article__tags'>
            <div className='tags d-flex'>
              <fieldset>
                <legend>Add tags</legend>
                <input
                  type='text'
                  name='tags'
                  onChange={onChangeTagValue}
                  value={value}
                  ref={register({
                    minLength: 2,
                    maxLength: 20,
                  })}
                />
                {errors.tags && (
                  <span className='no-valid'>
                    Tag must have at least from 2 to 20 characters
                  </span>
                )}
                <button className='add-tag' onClick={onSubmitNewTask}>
                  Add tag
                </button>
              </fieldset>
            </div>
            {tags.length !== 0 && <ul className='tag-list'>{createTags()}</ul>}
          </div>
          <button type='submit'>Create post</button>
        </fieldset>
      </form>
    </div>
  );
};

export default ArticlePostForm;
