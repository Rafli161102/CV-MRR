const { getDB } = require('@/lib/db');
const { getTokenFromHeaders, verifyToken } = require('@/lib/auth');

function requireAuth(headers) {
  const token = getTokenFromHeaders(headers);
  if (!token) {
    return null;
  }
  const user = verifyToken(token);
  if (!user) {
    return null;
  }
  return user;
}

export async function GET(request) {
  try {
    const db = getDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const project = db.prepare(
        'SELECT * FROM projects WHERE id = ?'
      ).get(id);

      if (!project) {
        return Response.json({ error: 'Project not found' }, { status: 404 });
      }

      return Response.json({
        ...project,
        images: JSON.parse(project.images || '[]')
      });
    }

    const projects = db.prepare('SELECT * FROM projects').all();
    return Response.json(
      projects.map(p => ({
        ...p,
        images: JSON.parse(p.images || '[]')
      }))
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const db = getDB();

    const stmt = db.prepare(`
      INSERT INTO projects (id, title, company, category, description, image, images)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.id,
      data.title,
      data.company || '',
      data.category || '',
      data.description || '',
      data.image || '',
      JSON.stringify(data.images || [])
    );

    return Response.json({ success: true, id: data.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const db = getDB();

    const stmt = db.prepare(`
      UPDATE projects 
      SET title = ?, company = ?, category = ?, description = ?, image = ?, images = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      data.title,
      data.company || '',
      data.category || '',
      data.description || '',
      data.image || '',
      JSON.stringify(data.images || []),
      data.id
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Missing project ID' }, { status: 400 });
    }

    const db = getDB();
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
