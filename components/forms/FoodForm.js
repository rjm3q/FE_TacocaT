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
  type: '',
  lat: '',
  long: '',
  ownerName: '',
  shopName: '',
  image: '',
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
        .then(() => router.push('/tacos/tacoIndex'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTaco(payload).then(() => {
        router.push('/');
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
          name="shopName"
          value={formInput.shopName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Owner Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name of Head Taco Person"
          name="ownerName"
          value={formInput.ownerName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* need to make this a multi input area */}
      <FloatingLabel controlId="floatingInput1" label="Address/Location" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Location of Taco Dispensary"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* type of restaraunt like japanese, itilain, mexican, etc */}
      {/* <FloatingLabel controlId="floatingInput1" label="Taco Shop Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name of Taco Dispensary"
          name="category"
          value={formInput.category}
          onChange={handleChange}
          required
        />
      </FloatingLabel> */}

      {/* change to drop down list */}
      <FloatingLabel controlId="floatingInput1" label="Street food/ Dine in / Authentic" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Street food/ Dine in / Authentic"
          name="type"
          value={formInput.type}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder=""
          name="image"
          value={formInput.image}
          onChange={handleChange}
        />
      </FloatingLabel>
      {/* dropdown form selctors for type and catgory */}
      {/* <Form.Select aria-label="Type of Place">
        <option>Choose a type of place</option>
        <option value="Street Food">One</option>
        <option value="Authentic">Two</option>
        <option value="Dine In">Three</option>
      </Form.Select>

      <Form.Select aria-label="Category of Place">
        <option>Choose a categoryof food</option>
        <option value="Street Food">One</option>
        <option value="Authentic">Two</option>
        <option value="Dine In">Three</option>
        <option value="Dine In">Three</option>
        <option value="Dine In">Three</option>
        <option value="Dine In">Three</option>
      </Form.Select> */}

      {/* form section for later address collection ...import InputGroup */}
      {/* <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">{IconTaco}</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Street Address"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="City"
          name="cty"
          value={formInput.city}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text> </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="State"
          name="state"
          value={formInput.state}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text> </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Zip Code"
          name="zip"
          value={formInput.zip}
          onChange={handleChange}
          required
        />
      </InputGroup> */}

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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Submit Taco Place</Button>
    </Form>
  );
}
FoodForm.propTypes = {
  obj: PropTypes.shape({
    address: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    ownerName: PropTypes.string,
    shopName: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

FoodForm.defaultProps = {
  obj: initialState,
};

export default FoodForm;
