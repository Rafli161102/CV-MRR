// DEPRECATED: Migrated to MongoDB. This route is disabled.
// const { getDB } = require('@/lib/db');
const { getTokenFromHeaders, verifyToken } = require('@/lib/auth');

function requireAuth(headers) {
  const token = getTokenFromHeaders(headers);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  return Response.json({ 
    error: 'Deprecated: Use /api/seed or MongoDB routes',
    redirect: '/api/seed'
  }, { status: 410 });
}

export async function POST(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    const db = getDB();

    const stmt = db.prepare(`
      INSERT INTO education (year, degree, institution, description)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(data.year, data.degree, data.institution, data.description);
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
      UPDATE education 
      SET year = ?, degree = ?, institution = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(data.year, data.degree, data.institution, data.description, data.id);

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
    db.prepare('DELETE FROM education WHERE id = ?').run(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
