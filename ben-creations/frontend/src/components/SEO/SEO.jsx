
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://benkreationz.vercel.app";
const SITE_NAME = "BenKreations";

const DEFAULT_DESCRIPTION =
  "Explore BenKreations: web development, graphic design, motion graphics, AI video creation, and digital marketing services in Ghana.";

function SEO({
  title = "Web Development, Graphic Design & Creative Digital Services",
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "/og-image.jpg",
  noIndex = false,
}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const canonicalUrl = new URL(normalizedPath, SITE_URL).href;
  const imageUrl = new URL(image, SITE_URL).href;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

export default SEO;
