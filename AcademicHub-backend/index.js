const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
const PORT = 5000;
const dataFilePath = path.join(__dirname, 'publications.json');

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Read publications from file
function readPublications() {
  const jsonData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

// Save publications to file
function savePublications(publications) {
  fs.writeFileSync(dataFilePath, JSON.stringify(publications, null, 2), 'utf8');
}

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AcademicHub Publications API',
      version: '1.0.0',
      description: 'API for managing academic publications',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [__filename], // Use current file for swagger docs
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
 *
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
 *             required:
 *               - citationKey
 *               - entryType
 *               - entryTags
 *     responses:
 *       201:
 *         description: Publication added successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Duplicate citationKey
 */
app.get('/api/publications', (req, res) => {
  const publications = readPublications();
  res.json(publications);
});

app.post('/api/publications', (req, res) => {
  const newPublication = req.body;

  if (
    !newPublication.citationKey ||
    !newPublication.entryType ||
    !newPublication.entryTags
  ) {
    return res.status(400).json({ error: 'Invalid publication format' });
  }

  try {
    const publications = readPublications();

    const exists = publications.some(pub => pub.citationKey === newPublication.citationKey);
    if (exists) {
      return res.status(409).json({ error: 'Publication with this citationKey already exists' });
    }

    publications.push(newPublication);
    savePublications(publications);

    res.status(201).json({ message: 'Publication added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save publication' });
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
 *         description: Year to filter publications by
 *     responses:
 *       200:
 *         description: Filtered publications by year
 */
app.get('/api/publications/year/:year', (req, res) => {
  const year = req.params.year;
  const publications = readPublications();
  const filtered = publications.filter(pub => pub.entryTags.year === year);
  res.json(filtered);
});

/**
 * @swagger
 * /api/publications/search/{keyword}:
 *   get:
 *     summary: Search publications by keyword
 *     parameters:
 *       - in: path
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search in publications
 *     responses:
 *       200:
 *         description: Filtered publications by keyword
 */
app.get('/api/publications/search/:keyword', (req, res) => {
  const keyword = req.params.keyword.toLowerCase();
  const publications = readPublications();
  const filtered = publications.filter(pub =>
    JSON.stringify(pub).toLowerCase().includes(keyword)
  );
  res.json(filtered);
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
 *         description: Citation key of the publication
 *     responses:
 *       200:
 *         description: A single publication
 *       404:
 *         description: Publication not found
 */
app.get('/api/publications/:citationKey', (req, res) => {
  const { citationKey } = req.params;
  const publications = readPublications();
  const publication = publications.find(pub => pub.citationKey === citationKey);

  if (publication) {
    res.json(publication);
  } else {
    res.status(404).json({ error: 'Publication not found' });
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
