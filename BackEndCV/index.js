import express from 'express'
import mysql from 'mysql'
import cors from 'cors';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';
import dotenv from 'dotenv';


// Esto reemplaza __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express()
app.use(express.json());

app.use(cors({
  origin: 'https://damianhub.site', // permite solo tu frontend
  methods: ['GET', 'POST', 'DELETE'],        // métodos permitidos
  credentials: true                // si usas cookies o auth headers
}));

const db = mysql.createPool({
  connectionLimit: 10, // puedes ajustar el límite si quieres
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.on('error', function (err) {
  console.error('Database error:', err.code);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configura almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate que esta carpeta exista
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${req.body.userId}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });



app.post("/verify", (req, res) => {
  const { token } = req.body;

  const sql = "SELECT * FROM user_token WHERE token = ?";
  db.query(sql, [token], (err, data) => {
    if (err || data.length === 0) return res.json({ valid: false });

    const now = new Date();
    const expires = new Date(data[0].expires_at);
    if (now > expires) return res.json({ valid: false });

    return res.json({ valid: true });
  });
});

// Ruta para subir imagen
app.post('/uploadProfile', upload.single('image'), async (req, res) => {
  const filename = req.file.filename;
  const { userId } = req.body;

  const sql = 'SELECT * FROM image_user WHERE id_user = ?';
  db.query(sql, [userId], (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });

    if (data.length > 0) {
      // Ya existe, actualiza

      // Intentar eliminar imagen anterior
      const oldFilename = data[0].name_route;
      const filePath = path.join(__dirname, 'uploads', oldFilename);

      fs.access(filePath, fs.constants.F_OK, (errAccess) => {
        if (!errAccess) {
          fs.unlink(filePath, (errUnlink) => {
            if (errUnlink) {
              console.error("❌ Error al borrar imagen anterior:", errUnlink);
            } else {
              console.log("Imagen anterior eliminada:", oldFilename);
            }
          });
        }
      });
      const updateQuery = 'UPDATE image_user SET name_route = ? WHERE id_user = ?';
      db.query(updateQuery, [filename, userId], (err2, result) => {
        if (err2) return res.json({ Error: "Error al actualizar la imagen" });
        return res.json({ status: "Success", message: "Imagen actualizada correctamente", filename });
      });
    } else {
      // No existe, inserta
      const insertQuery = 'INSERT INTO image_user (name_route, id_user) VALUES (?, ?)';
      db.query(insertQuery, [filename, userId], (err3, result) => {
        if (err3) return res.json({ Error: "Error al insertar la imagen" });
        return res.json({ status: "Success", message: "Imagen subida correctamente", filename });
      });
    }
  });
});

// Ruta para subir imagen
app.post('/uploadcertification', upload.single('image'), (req, res) => {
  const { name, userId } = req.body;
  const file = req.file;

  if (!name || !userId || !file) {
    return res.status(400).json({ error: "Faltan datos: nombre, usuario o imagen." });
  }

  const filename = file.filename;
  const sql = 'INSERT INTO certificates (name, image, id_user) VALUES (?, ?, ?)';

  db.query(sql, [name, filename, userId], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
      return res.status(500).json({ error: "Error al guardar el certificado." });
    }

    return res.json({status: "Success",});
  });
});


app.get('/certification', (req, res) => {
  const sql = 'SELECT * FROM certificates';
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });
    return res.json(data);
  });
});

// Ruta para subir imagen
app.post('/uploadskill', upload.single('image'), (req, res) => {
  const { name, userId } = req.body;
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({ error: "Faltan datos: nombre, usuario o imagen." });
  }

  const filename = file.filename;
  const sql = 'INSERT INTO skills (name, filename) VALUES (?, ?)';

  db.query(sql, [name, filename], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
      return res.status(500).json({ error: "Error al guardar el certificado." });
    }

    return res.json({status: "Success",});
  });
});


app.get('/skillsWatch', (req, res) => {
  const id_user = 1; // ID fijo para el usuario público

  const sql = `
    SELECT s.id_skills, s.name, s.filename
    FROM user_skills us
    INNER JOIN skills s ON us.id_skills = s.id_skills
    WHERE us.id_user = ?
  `;

  db.query(sql, [id_user], (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta de skills" });
    return res.json(data);
  });
});


// Ruta para subir imagen
app.post('/uploadtechnology', upload.single('image'), (req, res) => {
  const { name, userId } = req.body;
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({ error: "Faltan datos: nombre, usuario o imagen." });
  }

  const filename = file.filename;
  const sql = 'INSERT INTO technologies (name, icon) VALUES (?, ?)';

  db.query(sql, [name, filename], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
      return res.status(500).json({ error: "Error al guardar el certificado." });
    }

    return res.json({status: "Success",});
  });
});

// Ruta para subir imagen
app.post('/uploadProject', upload.array('images', 5), (req, res) => {

  console.log('Body:', req.body);
  console.log('Files:', req.files);

  const { title, description, userId, selectedTechnologies } = req.body;
  const files = req.files;

  if (!title || !description || !files || files.length === 0) {
    return res.status(400).json({ error: "Faltan datos: título, descripción o imágenes." });
  }

  // selectedTechnologies puede venir como string o array
  let technologies = selectedTechnologies;
  if (!Array.isArray(technologies)) {
    technologies = [technologies];
  }

  const sqlInsertProject = 'INSERT INTO projects (title, description, id_user) VALUES (?, ?, ?)';

  db.query(sqlInsertProject, [title, description, userId], (err, result) => {
    if (err) {
      console.error("Error al insertar proyecto:", err);
      return res.status(500).json({ error: "Error al guardar el proyecto." });
    }

    const projectId = result.insertId;

    // Insertar imágenes (pueden ser varias)
    const sqlInsertImage = 'INSERT INTO project_images (id_project, image_url) VALUES ?';
    const imageValues = files.map(file => [projectId, file.filename]);

    db.query(sqlInsertImage, [imageValues], (errImg) => {
      if (errImg) {
        console.error("Error al insertar imágenes:", errImg);
        return res.status(500).json({ error: "Error al guardar las imágenes." });
      }

      // Insertar tecnologías asociadas (varias)
      const sqlInsertTech = 'INSERT INTO project_technology (id_project, id_technology) VALUES ?';
      const techValues = technologies.map(idTech => [projectId, idTech]);

      db.query(sqlInsertTech, [techValues], (errTech) => {
        if (errTech) {
          console.error("Error al insertar tecnologías:", errTech);
          return res.status(500).json({ error: "Error al guardar las tecnologías." });
        }

        return res.json({ status: "Success", projectId });
      });
    });
  });
});

app.get('/projects', (req, res) => {
  const sql = `
SELECT 
  p.id_projects,
  p.title,
  p.description,
  p.id_user,
  pi.id_image,
  pi.image_url
FROM projects p
LEFT JOIN project_images pi ON p.id_projects = pi.id_project
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });
    return res.json(data);
  });
});

const query = util.promisify(db.query).bind(db);
app.delete('/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    // 1. Obtener imágenes del proyecto
    const images = await query('SELECT image_url FROM project_images WHERE id_project = ?', [projectId]);

    // 2. Eliminar archivos físicos
    images.forEach(image => {
      const filePath = path.join(__dirname, 'uploads', image.image_url);
      fs.unlink(filePath, err => {
        if (err && err.code !== 'ENOENT') {
          console.error(`No se pudo eliminar imagen ${image.image_url}:`, err);
        }
      });
    });

    // 3. Eliminar relaciones en project_images y project_technology
    await query('DELETE FROM project_images WHERE id_project = ?', [projectId]);
    await query('DELETE FROM project_technology WHERE id_project = ?', [projectId]);

    // 4. Eliminar el proyecto
    await query('DELETE FROM projects WHERE id_projects = ?', [projectId]);

    res.status(200).json({ message: 'Proyecto eliminado con éxito.' });

  } catch (err) {
    console.error('Error al eliminar proyecto:', err);
    res.status(500).json({ error: 'Error interno al eliminar proyecto.' });
  }
});

app.delete('/certificate/:id', async (req, res) => {
  const certificateId = req.params.id;

  try {
    // 1. Obtener la imagen del certificado
    const results = await query('SELECT image FROM certificates WHERE id_certificates = ?', [certificateId]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Certificado no encontrado.' });
    }
    const image = results[0].image;

    // 2. Eliminar archivo físico
    const filePath = path.join(__dirname, 'uploads', image);
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error(`No se pudo eliminar la imagen ${image}:`, err);
      }
    });

    // 3. Eliminar registro del certificado
    await query('DELETE FROM certificates WHERE id_certificates = ?', [certificateId]);

    res.status(200).json({ message: 'Certificado eliminado con éxito.' });

  } catch (err) {
    console.error('Error al eliminar certificado:', err);
    res.status(500).json({ error: 'Error interno al eliminar certificado.' });
  }
});



app.post('/myskill', (req, res) => {
  const { userId, selectedSkills } = req.body;

  let skills = selectedSkills;
  if (!Array.isArray(skills)) {
    skills = [skills];
  }

  if (!userId || !skills || skills.length === 0) {
    return res.status(400).json({ error: "Faltan datos: usuario o habilidades." });
  }

  const sql = 'INSERT INTO user_skills (id_user, id_skills) VALUES ?';
  const skillValues = skills.map(idSkill => [userId, idSkill]);

  db.query(sql, [skillValues], (err, result) => {
    if (err) {
      console.error("Error al insertar habilidades:", err);
      return res.status(500).json({ error: "Error al guardar las habilidades." });
    }

    return res.json({ status: "Success", insertCount: result.affectedRows });
  });
});


app.delete('/myskill', (req, res) => {
  const { userId, idSkill } = req.body;
  const sql = 'DELETE FROM user_skills WHERE id_user = ? AND id_skills = ?';

  db.query(sql, [userId, idSkill], (err, result) => {
    if (err) {
      console.error('Error al eliminar habilidad del usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar habilidad del usuario' });
    }

    res.json({ status: 'success' });
  });
});


// GET /myskill/:id
app.get('/myskill/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT id_skills FROM user_skills WHERE id_user = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error al obtener habilidades del usuario:', err);
      return res.status(500).json({ error: 'Error al obtener habilidades del usuario' });
    }

    const skills = result.map(row => row.id_skills.toString()); // Convertimos a string para que coincida con los `value` del checkbox
    res.json(skills);
  });
});


app.get('/skill', (req, res) =>{
  const sql = 'SELECT * FROM skills';
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });
    return res.json(data);
  });
})
app.delete('/skills/:id', async (req, res) => {
  const skillId = req.params.id;

  try {
    // 1. Obtener el archivo del skill
    const results = await query('SELECT filename FROM skills WHERE id_skills = ?', [skillId]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Skill no encontrado.' });
    }
    const filename = results[0].filename;

    // 2. Eliminar archivo físico si existe
    if (filename) {
      const filePath = path.join(__dirname, 'uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error(`No se pudo eliminar el archivo ${filename}:`, err);
        }
      });
    }

    // 3. Eliminar registro de la tabla skills
    await query('DELETE FROM skills WHERE id_skills = ?', [skillId]);

    res.status(200).json({ message: 'Skill eliminado con éxito.' });

  } catch (err) {
    console.error('Error al eliminar skill:', err);
    res.status(500).json({ error: 'Error interno al eliminar skill.' });
  }
});

app.get('/technologies', (req, res) =>{
  const sql = 'SELECT * FROM technologies';
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });
    return res.json(data);
  });
})

app.delete('/technologies/:id', async (req, res) => {
  const techId = req.params.id;

  try {
    // 1. Obtener el icono del technology
    const results = await query('SELECT icon FROM technologies WHERE id_technologies = ?', [techId]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Technology no encontrado.' });
    }
    const icon = results[0].icon;

    // 2. Eliminar archivo físico si existe
    if (icon) {
      const filePath = path.join(__dirname, 'uploads', icon);
      fs.unlink(filePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error(`No se pudo eliminar el archivo ${icon}:`, err);
        }
      });
    }

    // 3. Eliminar registro de la tabla technologies
    await query('DELETE FROM technologies WHERE id_technologies = ?', [techId]);

    res.status(200).json({ message: 'Technology eliminado con éxito.' });

  } catch (err) {
    console.error('Error al eliminar technology:', err);
    res.status(500).json({ error: 'Error interno al eliminar technology.' });
  }
});




app.post('/login', (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, response) => {
        if (err) return res.json({ Error: "Error al comparar la contraseña" });

        if (response) {
          const token = jwt.sign(
            { id_user: data[0].id_user, email: data[0].email },
            "jwt-secret-key",
            { expiresIn: '1d' }
          );

          const createdAt = new Date();
          const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000); // +1 día

          // Primero borrar tokens previos de este usuario
          const deleteTokenSql = "DELETE FROM user_token WHERE id_user = ?";
          db.query(deleteTokenSql, [data[0].id_user], (errDelete) => {
            if (errDelete) return res.json({ Error: "Error al borrar tokens previos" });

            // Ahora insertar el nuevo token
            const insertTokenSql = "INSERT INTO user_token (id_user, created_at, expires_at, token) VALUES (?, ?, ?, ?)";
            db.query(insertTokenSql, [data[0].id_user, createdAt, expiresAt, token], (err2, result) => {
              if (err2) return res.json({ Error: "Error al guardar el token" });

              return res.json({ token, status: "Success" });
            });
          });
        } else {
          return res.json({ Error: "Clave incorrecta" });
        }
      });
    } else {
      return res.json({ Error: "Usuario no encontrado" });
    }
  });
});

app.post('/info', (req, res) => {
   
  const { id_user, name, description, cv } = req.body;

  const sql = 'SELECT * FROM info WHERE id_user = ?';
  db.query(sql, [id_user], (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });

    if (data.length > 0) {
      // Ya existe, solo actualiza campos que sí vienen
      const current = data[0];
      const newName = name !== undefined ? name : current.name;
      const newDescription = description !== undefined ? description : current.description;
      const newCv = cv !== undefined ? cv : current.cv;

      const updateQuery = 'UPDATE info SET name = ?, description = ?, cv = ? WHERE id_user = ?';
      db.query(updateQuery, [newName, newDescription, newCv, id_user], (err2, result) => {
        if (err2) return res.json({ Error: "Error al actualizar" });
        return res.json({ status: "Success", message: "Registro actualizado correctamente" });
      });

    } else {
      // No existe, insertar nuevos datos (usa '' si faltan)
      const newName = name || '';
      const newDescription = description || '';
      const newCv = cv || '';

      const insertQuery = 'INSERT INTO info (name, description, cv, id_user) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [newName, newDescription, newCv, id_user], (err3, result) => {
        if (err3) return res.json({ Error: "Error al insertar" });
        return res.json({ status: "Success", message: "Registro creado correctamente" });
      });
    }
  });
});



app.post('/contact', (req, res) => {
  const { id_user, github, email, instagram } = req.body;

  const sql = 'SELECT * FROM contact WHERE id_user = ?';
  db.query(sql, [id_user], (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta" });

    if (data.length > 0) {
      const current = data[0];
      const newGit = github !== undefined ? github : current.git_link;
      const newemail = email !== undefined ? email : current.email_at;
      const newinstagram = instagram !== undefined ? instagram : current.instagram_link;

      const updateQuery = 'UPDATE contact SET git_link = ?, email_at = ?, instagram_link = ? WHERE id_user = ?';
      db.query(updateQuery, [newGit, newemail, newinstagram, id_user], (err2, result) => {
        if (err2) return res.json({ Error: "Error al actualizar" });
        return res.json({ status: "Success", message: "Registro actualizado correctamente" });
      });

    } else {
      const newGit = github || '';
      const newemail = email || '';
      const newinstagram = instagram || '';

      const insertQuery = 'INSERT INTO contact (git_link, email_at, instagram_link, id_user) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [newGit, newemail, newinstagram, id_user], (err3, result) => {
        if (err3) return res.json({ Error: "Error al insertar" });
        return res.json({ status: "Success", message: "Registro creado correctamente" });
      });
    }
  });
});

// Obtener todos los contactos
app.get('/contactinfo', (req, res) => {
  const sql = 'SELECT * FROM contact';
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta de contact" });
    return res.json(data);
  });
});

// Obtener toda la info
app.get('/infoget', (req, res) => {
  const sql = 'SELECT * FROM info';
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta de info" });
    return res.json(data);
  });
});

// Obtener todas las imágenes de usuario
app.get('/image_user', (req, res) => {
  const sql = 'SELECT * FROM image_user';
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error en la consulta de image_user" });
    return res.json(data);
  });
});







db.query('SELECT 1', (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000')

})
