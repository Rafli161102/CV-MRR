const { getDB } = require('@/lib/db');
const { getTokenFromHeaders, verifyToken } = require('@/lib/auth');

function requireAuth(headers) {
  const token = getTokenFromHeaders(headers);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    const db = getDB();
    const items = db.prepare('SELECT * FROM photo_gallery ORDER BY rowid ASC').all();
    return Response.json(items);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    const db = getDB();

    const stmt = db.prepare(`
      INSERT INTO photo_gallery (url, title)
      VALUES (?, ?)
    `);

    const result = stmt.run(data.url, data.title);
    return Response.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    const db = getDB();

    db.prepare(`
      UPDATE photo_gallery 
      SET url = ?, title = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(data.url, data.title, data.id);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return Response.json({ error: 'Missing ID' }, { status: 400 });

    const db = getDB();
    db.prepare('DELETE FROM photo_gallery WHERE id = ?').run(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
