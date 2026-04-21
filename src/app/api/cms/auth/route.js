const { getDB } = require('@/lib/db');
const { createToken, verifyPassword, hashPassword } = require('@/lib/auth');

export async function POST(request) {
  try {
    const { action, username, password, newPassword } = await request.json();

    if (action === 'login') {
      return handleLogin(username, password);
    } else if (action === 'register') {
      return handleRegister(username, password);
    } else if (action === 'change-password') {
      return handleChangePassword(username, password, newPassword);
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function handleLogin(username, password) {
  try {
    const db = getDB();
    const user = db.prepare(
      'SELECT id, username, password_hash FROM admin_users WHERE username = ?'
    ).get(username);

    if (!user || !verifyPassword(password, user.password_hash)) {
      return Response.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = createToken(user.id, user.username);
    return Response.json({
      success: true,
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function handleRegister(username, password) {
  try {
    if (!username || !password || password.length < 6) {
      return Response.json(
        { error: 'Invalid username or password (min 6 chars)' },
        { status: 400 }
      );
    }

    const db = getDB();
    const stmt = db.prepare(`
      INSERT INTO admin_users (username, password_hash, email)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(
      username,
      hashPassword(password),
      `${username}@mrr.local`
    );

    const token = createToken(result.lastInsertRowid, username);
    return Response.json({
      success: true,
      token,
      user: { id: result.lastInsertRowid, username }
    });
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return Response.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function handleChangePassword(username, oldPassword, newPassword) {
  try {
    const db = getDB();
    const user = db.prepare(
      'SELECT id, password_hash FROM admin_users WHERE username = ?'
    ).get(username);

    if (!user || !verifyPassword(oldPassword, user.password_hash)) {
      return Response.json(
        { error: 'Invalid old password' },
        { status: 401 }
      );
    }

    db.prepare('UPDATE admin_users SET password_hash = ? WHERE username = ?').run(
      hashPassword(newPassword),
      username
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
