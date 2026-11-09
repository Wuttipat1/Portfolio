// Cloudflare Pages Function: /api/certificates
// Handles CRUD operations for Certifications with Cloudflare D1

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM certificates ORDER BY date_issued DESC"
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
    const id = body.id || 'cert-' + Date.now();

    await context.env.DB.prepare(`
      INSERT INTO certificates (
        id, title_th, title_en, issuer, date_issued, credential_id, pdf_r2_key, pdf_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      body.title_th || body.title,
      body.title_en || body.title,
      body.issuer,
      body.date_issued || body.date,
      body.credential_id || body.credentialId || '',
      body.pdf_r2_key || '',
      body.pdf_url || body.pdfData || ''
    ).run();

    return new Response(
      JSON.stringify({ success: true, message: "Certificate created", id }),
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
        JSON.stringify({ success: false, error: "Certificate ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await context.env.DB.prepare(`
      UPDATE certificates SET 
        title_th = ?, title_en = ?, issuer = ?, date_issued = ?, 
        credential_id = ?, pdf_r2_key = ?, pdf_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      body.title_th || body.title,
      body.title_en || body.title,
      body.issuer,
      body.date_issued || body.date,
      body.credential_id || body.credentialId || '',
      body.pdf_r2_key || '',
      body.pdf_url || body.pdfData || '',
      body.id
    ).run();

    return new Response(
      JSON.stringify({ success: true, message: "Certificate updated" }),
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

    await context.env.DB.prepare("DELETE FROM certificates WHERE id = ?").bind(id).run();

    return new Response(
      JSON.stringify({ success: true, message: "Certificate deleted successfully" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
