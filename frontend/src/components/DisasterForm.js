import React, { useState } from 'react';
import { createDisaster, geocodeDescription } from '../api';

export default function DisasterForm() {
  const [form, setForm] = useState({ title: '', location_name: '', description: '', tags: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: geo } = await geocodeDescription(form.description);
    const payload = {
      ...form,
      tags: form.tags.split(','),
      location_name: geo.locationName,
    };
    await createDisaster(payload);
    alert("Disaster submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Tags (comma separated)" onChange={e => setForm({ ...form, tags: e.target.value })} />
      <button type="submit">Submit Disaster</button>
    </form>
  );
}
