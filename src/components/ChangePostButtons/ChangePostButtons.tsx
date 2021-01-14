import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Button } from 'antd';
import ServicesApi from '../../services/servicesAPI';

interface IProps {
  slug: string;
  token: string;
}

const ChangePostButtons: React.FC<IProps> = ({ slug, token }): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const api = new ServicesApi();
  const history = useHistory();

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
    <div className="private-btn">
      <Button danger className="btn btn-danger" onClick={showModal}>
        Delete
      </Button>
      <Link to={`${slug}/edit`}>
        <Button className="btn btn-edit">Edit</Button>
      </Link>
      <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <p>Delete this post ?</p>
      </Modal>
    </div>
  );
};

export default ChangePostButtons;
