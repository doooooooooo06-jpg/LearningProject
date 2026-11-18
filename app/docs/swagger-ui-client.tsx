"use client";

import { useEffect, useRef, useState } from "react";

type SwaggerUiFactory = ((options: Record<string, unknown>) => unknown) & {
  presets: { apis: unknown };
};

declare global {
  interface Window {
    SwaggerUIBundle?: SwaggerUiFactory;
  }
}

export default function SwaggerUiClient() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading Swagger UI…");

  useEffect(() => {
    const cssId = "swagger-ui-cdn-css";
    const scriptId = "swagger-ui-cdn-script";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/swagger-ui-dist@5/swagger-ui.css";
      document.head.appendChild(link);
    }

    const render = () => {
      if (!window.SwaggerUIBundle || !mountRef.current) return;
      window.SwaggerUIBundle({
        url: "/openapi.json",
        domNode: mountRef.current,
        deepLinking: true,
        displayRequestDuration: true,
        docExpansion: "list",
        filter: true,
        supportedSubmitMethods: [],
        presets: [window.SwaggerUIBundle.presets.apis],
        layout: "BaseLayout",
      });
      setStatus("");
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing && window.SwaggerUIBundle) {
      render();
      return;
    }
    const script = existing ?? document.createElement("script");
    script.id = scriptId;
    script.src = "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js";
    script.async = true;
    script.onload = render;
    script.onerror = () => setStatus("Swagger UI could not load. The OpenAPI JSON spec is still available below.");
    if (!existing) document.body.appendChild(script);
  }, []);

  return <>
    {status && <div className="api-docs-status" role="status">{status}</div>}
    <div className="api-docs-swagger" ref={mountRef} />
  </>;
}
