const { getDB } = require('@/lib/db');
const { PROJECT_LIST, WORK_EXPERIENCE, EDUCATION, PHOTO_GALLERY } = require('@/data/store');
const { hashPassword } = require('@/lib/auth');

// This is for development/setup only
export async function POST(request) {
  try {
    const db = getDB();
    
    // Clear existing data
    db.exec('DELETE FROM projects');
    db.exec('DELETE FROM work_experience');
    db.exec('DELETE FROM education');
    db.exec('DELETE FROM photo_gallery');
    db.exec('DELETE FROM admin_users');

    // Seed projects
    const projectStmt = db.prepare(`
      INSERT INTO projects (id, title, company, category, description, image, images)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    PROJECT_LIST.forEach(project => {
      projectStmt.run(
        project.id,
        project.title,
        project.company,
        project.category,
        project.description,
        project.image,
        JSON.stringify(project.images)
      );
    });

    // Seed work experience
    const workStmt = db.prepare(`
      INSERT INTO work_experience (year, role, company, description)
      VALUES (?, ?, ?, ?)
    `);
    
    WORK_EXPERIENCE.forEach(work => {
      workStmt.run(work.year, work.role, work.company, work.description);
    });

    // Seed education
    const eduStmt = db.prepare(`
      INSERT INTO education (year, degree, institution, description)
      VALUES (?, ?, ?, ?)
    `);
    
    EDUCATION.forEach(edu => {
      eduStmt.run(edu.year, edu.degree, edu.institution, edu.description);
    });

    // Seed photo gallery
    const photoStmt = db.prepare(`
      INSERT INTO photo_gallery (url, title)
      VALUES (?, ?)
    `);
    
    PHOTO_GALLERY.forEach(photo => {
      photoStmt.run(photo.url, photo.title);
    });

    // Create default admin user (username: admin, password: admin123)
    const adminStmt = db.prepare(`
      INSERT INTO admin_users (username, password_hash, email)
      VALUES (?, ?, ?)
    `);
    
    try {
      adminStmt.run(
        'admin',
        hashPassword('admin123'),
        'admin@mrr.local'
      );
    } catch (e) {
      // Admin user might already exist
    }

    return Response.json(
      { message: 'Database seeded successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
