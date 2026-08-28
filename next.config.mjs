/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
    // proxy.js ruleaza pe orice /api/*, deci Next bufereaza tot corpul
    // cererii ca sa poata fi citit si acolo si in route handler — limitat
    // implicit la 10MB. O poza facuta cu telefonul depaseste usor atat, iar
    // trunchierea silentioasa strica boundary-ul multipart (formData() pica
    // cu "Failed to parse body as FormData"). Peste pragul de aici, limita
    // proprie din /api/upload (MAX_BYTES) ia mesaj clar, nu trunchiere.
    proxyClientMaxBodySize: "15mb",
  },
};

export default nextConfig;
