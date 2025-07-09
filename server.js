const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/analyze', (req, res) => {
  // For now just return a placeholder response
  res.json({ success: true, message: 'Analysis pending implementation' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
