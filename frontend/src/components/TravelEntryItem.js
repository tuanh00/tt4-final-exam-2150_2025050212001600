import React from 'react';
import { Button, Image } from 'react-bootstrap';

export default function TravelEntryItem({ entry, onEdit, onDelete }) {
  const urls = entry.photos
    ? entry.photos.split(',').map(u => u.trim()).filter(u => u)
    : [];

  return (
    <tr>
      <td>{entry.id}</td>
      <td>{entry.location}</td>
      <td>{new Date(entry.date).toLocaleDateString()}</td>
      <td>{entry.description}</td>
      <td>
        {urls.length > 0 ? (
          urls.map((url, i) => (
            <Image
              key={i}
              src={url}
              thumbnail
              style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
              className="me-1"
            />
          ))
        ) : (
          <span>-</span>
        )}
      </td>
      <td>
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="me-2"
        >
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
