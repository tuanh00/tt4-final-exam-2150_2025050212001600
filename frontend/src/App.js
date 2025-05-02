import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import {
  fetchEntries,
  createEntry,
  updateEntry,
  deleteEntry
} from './api';
import TravelEntriesList from './components/TravelEntriesList';
import TravelEntryForm from './components/TravelEntryForm';

function App() {
  const [entries, setEntries]     = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState(null);

  const load = async () => {
    const { data } = await fetchEntries();
    setEntries(data);
  };

  useEffect(() => { load() }, []);

  const handleCreate = async e => {
    await createEntry(e);
    load();
    setShowForm(false);
  };

  const handleUpdate = async (id, e) => {
    await updateEntry(id, e);
    load();
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this entry?')) {
      await deleteEntry(id);
      load();
    }
  };

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = e => {
    setEditing(e);
    setShowForm(true);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h1>Travel Journal</h1></Col>
        <Col className="text-end">
          <Button onClick={openCreate}>New Entry</Button>
        </Col>
      </Row>

      <TravelEntriesList
        entries={entries}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <Modal show={showForm} onHide={() => setShowForm(false)}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit Entry' : 'New Entry'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TravelEntryForm
            entry={editing}
            onCancel={() => setShowForm(false)}
            onSubmit={data =>
              editing
                ? handleUpdate(editing.id, data)
                : handleCreate(data)
            }
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
