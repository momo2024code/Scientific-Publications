const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const db = require('./db'); // Make sure this exports a MySQL2 promise pool

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AcademicHub Publications API',
      version: '1.0.0',
      description: 'API for managing academic publications',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: [__filename],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/publications:
 *   get:
 *     summary: Get all publications
 *     responses:
 *       200:
 *         description: List of publications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   citationKey:
 *                     type: string
 *                     example: "savage2024_bayesian"
 *                   entryType:
 *                     type: string
 *                     example: "article"
 *                   entryTags:
 *                     type: object
 *                     properties:
 *                       author:
 *                         type: string
 *                       year:
 *                         type: string
 *                       title:
 *                         type: string
 *                       journal:
 *                         type: string
 *                       publisher:
 *                         type: string
 *                       tags:
 *                         type: string
 */
app.get('/api/publications', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM publications');
const publications = rows.map(row => ({
  ...row,
  entryTags: typeof row.entryTags === 'string' ? JSON.parse(row.entryTags) : row.entryTags
}));
    res.json(publications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * @swagger
 * /api/publications:
 *   post:
 *     summary: Add a new publication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               citationKey:
 *                 type: string
 *               entryType:
 *                 type: string
 *               entryTags:
 *                 type: object
 *     responses:
 *       201:
 *         description: Publication added successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Duplicate citationKey
 */
app.post('/api/publications', async (req, res) => {
  const { citationKey, entryType, entryTags } = req.body;
  if (!citationKey || !entryType || !entryTags) {
    return res.status(400).json({ error: 'Invalid publication format' });
  }

  try {
    await db.query(
      'INSERT INTO publications (citationKey, entryType, entryTags) VALUES (?, ?, ?)',
      [citationKey, entryType, JSON.stringify(entryTags)]
    );
    res.status(201).json({ message: 'Publication added successfully' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Publication with this citationKey already exists' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  }
});

/**
 * @swagger
 * /api/publications/{citationKey}:
 *   get:
 *     summary: Get a publication by citationKey
 *     parameters:
 *       - in: path
 *         name: citationKey
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: A single publication
 */
app.get('/api/publications/:citationKey', async (req, res) => {
  const { citationKey } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM publications WHERE citationKey = ?', [citationKey]);
    if (rows.length === 0) return res.status(404).json({ error: 'Publication not found' });

    res.json({
      ...rows[0],
      entryTags: typeof rows[0].entryTags === 'string' ? JSON.parse(rows[0].entryTags) : rows[0].entryTags
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


/**
 * @swagger
 * /api/publications/year/{year}:
 *   get:
 *     summary: Get publications by year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of publications for the year
 */
app.get('/api/publications/year/:year', async (req, res) => {
  const year = req.params.year;
  try {
    const [rows] = await db.query(
      'SELECT * FROM publications WHERE JSON_UNQUOTE(JSON_EXTRACT(entryTags, "$.year")) = ?',
      [year]
    );
const publications = rows.map(row => ({
  ...row,
  entryTags: typeof row.entryTags === 'string' ? JSON.parse(row.entryTags) : row.entryTags
}));
    res.json(publications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * @swagger
 * /api/publications/search/{keyword}:
 *   get:
 *     summary: Search publications by keyword in title
 *     parameters:
 *       - in: path
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of publications matching keyword
 */
app.get('/api/publications/search/:keyword', async (req, res) => {
  const keyword = `%${req.params.keyword.toLowerCase()}%`;
  try {
    const [rows] = await db.query(
      'SELECT * FROM publications WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(entryTags, "$.title"))) LIKE ?',
      [keyword]
    );
const publications = rows.map(row => ({
  ...row,
  entryTags: typeof row.entryTags === 'string' ? JSON.parse(row.entryTags) : row.entryTags
}));    res.json(publications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`AcademicHub-backend running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
