// Cloudflare Pages Function: /api/upload
// Handles file uploads (Images & PDFs) directly to Cloudflare R2 Object Storage (with fallback)

interface Env {
  PORTFOLIO_BUCKET?: R2Bucket;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const formData = await context.request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") || "uploads"; // 'images' or 'certificates'

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, error: "No file provided in form data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (context.env.PORTFOLIO_BUCKET) {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const key = `${folder}/${timestamp}_${safeName}`;

      await context.env.PORTFOLIO_BUCKET.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type,
        },
        customMetadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString()
        }
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "File uploaded successfully to Cloudflare R2",
          key,
          url: `/api/files/${key}`,
          size: file.size,
          type: file.type
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Storage handled via client-side IndexedDB engine",
        name: file.name,
        size: file.size
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
