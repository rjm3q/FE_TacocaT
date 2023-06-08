import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTaco, updateTaco } from '../../api/tacoData';

const initialState = {
  address: '',
  category: '',
  lat: '',
  long: '',
  ownerName: '',
  shopeName: '',
};
function FoodForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTaco(formInput)
        .then(() => router.push(`/taco/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTaco(payload).then(() => {
        router.push(`/taco/${obj.firebaseKey}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Taco Place</h2>

      <FloatingLabel controlId="floatingInput1" label="Taco Shop Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name of Taco Dispensary"
          name="dshopName"
          value={formInput.shopName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LIST SELECT  */}
      {/* <FloatingLabel controlId="floatingSelect" label="List">
        <Form.Select
          aria-label="List"
          name="listTitle"
          onChange={handleChange}
          className="mb-3"
          value={obj.list_id}
          required
        >
          <option value="">Project List</option>
          {
            list.map((listKey) => (
              <option
                key={listKey.firebaseKey}
                value={listKey.firebaseKey}
              >
                {listKey.listTitle}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Post Taco Place</Button>
    </Form>
  );
}

FoodForm.propTypes = {
  obj: PropTypes.shape({
    address: PropTypes.string,
    category: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    ownerName: PropTypes.string,
    shopeName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

FoodForm.defaultProps = {
  obj: initialState,
};

export default FoodForm;
