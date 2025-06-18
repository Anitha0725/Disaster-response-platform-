const supabase = require('../utils/supabaseClient');

exports.createDisaster = async (req, res) => {
  const io = req.app.get('socketio');
  const { title, location_name, description, tags, owner_id } = req.body;
  const { data, error } = await supabase
    .from('disasters')
    .insert([{ title, location_name, description, tags, owner_id }])
    .select();
  if (error) return res.status(500).json({ error });
  io.emit('disaster_updated', data[0]);
  res.status(201).json(data[0]);
};

exports.getDisasters = async (req, res) => {
  const tag = req.query.tag;
  let query = supabase.from('disasters').select('*');
  if (tag) query = query.contains('tags', [tag]);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
};

exports.updateDisaster = async (req, res) => {
  const io = req.app.get('socketio');
  const { id } = req.params;
  const { data, error } = await supabase
    .from('disasters')
    .update(req.body)
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error });
  io.emit('disaster_updated', data[0]);
  res.status(200).json(data[0]);
};

exports.deleteDisaster = async (req, res) => {
  const io = req.app.get('socketio');
  const { id } = req.params;
  const { error } = await supabase.from('disasters').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  io.emit('disaster_updated', { id, deleted: true });
  res.status(204).send();
};
