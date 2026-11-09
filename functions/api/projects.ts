// Cloudflare Pages Function: /api/projects
// Handles CRUD operations with Cloudflare D1 SQLite Database

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM projects ORDER BY created_at DESC"
    ).all();

    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body: any = await context.request.json();
    const id = body.id || 'proj-' + Date.now();

    await context.env.DB.prepare(`
      INSERT INTO projects (
        id, title_th, title_en, category, description_th, description_en,
        tech, image_url, demo_url, repo_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      body.title_th || body.title,
      body.title_en || body.title,
      body.category,
      body.description_th || body.description,
      body.description_en || body.description,
      Array.isArray(body.tech) ? body.tech.join(', ') : body.tech,
      body.image_url || body.image || '',
      body.demo_url || body.demoUrl || '',
      body.repo_url || body.repoUrl || ''
    ).run();

    return new Response(
      JSON.stringify({ success: true, message: "Project created", id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const body: any = await context.request.json();
    if (!body.id) {
      return new Response(
        JSON.stringify({ success: false, error: "Project ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await context.env.DB.prepare(`
      UPDATE projects SET 
        title_th = ?, title_en = ?, category = ?, description_th = ?, description_en = ?,
        tech = ?, image_url = ?, demo_url = ?, repo_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      body.title_th || body.title,
      body.title_en || body.title,
      body.category,
      body.description_th || body.description,
      body.description_en || body.description,
      Array.isArray(body.tech) ? body.tech.join(', ') : body.tech,
      body.image_url || body.image || '',
      body.demo_url || body.demoUrl || '',
      body.repo_url || body.repoUrl || '',
      body.id
    ).run();

    return new Response(
      JSON.stringify({ success: true, message: "Project updated" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await context.env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();

    return new Response(
      JSON.stringify({ success: true, message: "Project deleted successfully" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
