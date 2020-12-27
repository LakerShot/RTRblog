import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ServicesApi from '../../services/servicesAPI';

import { Modal, Button } from 'antd';

const ChangePostButtons: React.FC<any> = ({ slug, token }): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const api = new ServicesApi();
  let history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    api
      .changeRequest(null, token, 'DELETE', `/articles/${slug}`)
      .then((data) => history.push('/articles'))
      .catch((e) => console.log(e));
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className='private-btn'>
      <Link to={`${slug}/edit`}>
        <Button danger>Edit</Button>
      </Link>
      <Button type='primary' danger onClick={showModal}>
        Delete
      </Button>
      <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <p>Удалить этот пост?</p>
      </Modal>
    </div>
  );
};

export default ChangePostButtons;
