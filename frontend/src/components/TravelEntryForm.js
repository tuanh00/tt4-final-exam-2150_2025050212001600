import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function TravelEntryForm({ entry, onSubmit, onCancel }) {
  const [location, setLocation]       = useState('');
  const [date, setDate]               = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos]           = useState([]); // array of URLs

  // Initialize form fields when editing
  useEffect(() => {
    if (entry) {
      setLocation(entry.location);
      setDate(entry.date.slice(0, 10)); // yyyy-MM-dd
      setDescription(entry.description);
      setPhotos(entry.photos
        ? entry.photos.split(',').map(u => u.trim())
        : []);
    } else {
      setLocation('');
      setDate('');
      setDescription('');
      setPhotos([]);
    }
  }, [entry]);

  const handlePhotoChange = (idx, value) => {
    const list = [...photos];
    list[idx] = value;
    setPhotos(list);
  };

  const handleAddPhoto = () => setPhotos([...photos, '']);

  const handleRemovePhoto = idx => {
    const list = [...photos];
    list.splice(idx, 1);
    setPhotos(list);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      location,
      date,
      description,
      // join back to comma-separated string for the API
      photos: photos.filter(u => u).join(',')
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          required
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          required
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Photos</Form.Label>
        {photos.map((url, idx) => (
          <Row key={idx} className="mb-2">
            <Col xs={10}>
              <Form.Control
                type="url"
                placeholder="Photo URL"
                value={url}
                onChange={e => handlePhotoChange(idx, e.target.value)}
              />
            </Col>
            <Col xs={2}>
              <Button
                variant="outline-danger"
                 size="sm"
                onClick={() => handleRemovePhoto(idx)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <Button variant="outline-primary" onClick={handleAddPhoto} className="ms-3">
          + Add Photo
        </Button>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {entry ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
}
