import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCritic, updateCritic } from '../../api/criticData';

const initialState = {

};

function CriticForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { criticName, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [criticName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCritic(formInput)
        .then(() => router.push(`/critic/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCritic(payload).then(({ criticName }) => {
        const patchPayload = { firebaseKey: criticName };
        updateCritic(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Project Board</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter Project Board Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Project Board Title"
          name="boardTitle"
          value={formInput.boardTitle}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.team_id}
          required
        >
          <option value="">Select a Project Board Affiliation</option>
          {
            members.map((boardKey) => (
              <option
                key={boardKey.firebaseKey}
                value={boardKey.firebaseKey}
              >
                {boardKey.boardTitle}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Board</Button>
    </Form>
  );
}
// update proptypes from critic json
CriticForm.propTypes = {
  obj: PropTypes.shape({
    boardTitle: PropTypes.string,
    card: PropTypes.string,
    favorite: PropTypes.bool,
    members: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CriticForm.defaultProps = {
  obj: initialState,
};
export default CriticForm;
