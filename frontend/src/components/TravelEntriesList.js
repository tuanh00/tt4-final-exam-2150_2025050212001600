import React from 'react';
import { Table } from 'react-bootstrap';
import TravelEntryItem from './TravelEntryItem';

export default function TravelEntriesList({ entries, onEdit, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Date</th>
          <th>Description</th>
          <th>Photos</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(e => (
          <TravelEntryItem
            key={e.id}
            entry={e}
            onEdit={() => onEdit(e)}
            onDelete={() => onDelete(e.id)}
          />
        ))}
      </tbody>
    </Table>
  );
}
