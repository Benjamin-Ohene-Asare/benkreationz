
/* ==========================================
   BEN CREATIONS — PORTFOLIO DATA
   ORGANIZED GRAPHIC DESIGN COLLECTION
========================================== */

const imageModules = import.meta.glob(
  "../assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

/* ==========================================
   PORTFOLIO CATEGORIES
========================================== */

export const categories = [
  "All Works",
  "Church Flyers",
  "Political Campaigns",
  "Party & Event Flyers",
  "Funeral Designs",
  "Brochures",
  "Product Labels & Packaging",
  "Restaurant & Food Flyers",
  "Logo & Brand Identity",
  "Business Cards",
];

/* ==========================================
   SELECTED NEW FLY DESIGNS

   Categories assigned according to the
   actual artwork shown in your screenshots.
========================================== */

const selectedFlyers = {
  1: {
    title: "Funeral Tribute Design",
    category: "Funeral Designs",
  },

  2: {
    title: "Fast Delivery Promotional Flyer",
    category: "Restaurant & Food Flyers",
  },

  3: {
    title: "Funeral Programme Design",
    category: "Funeral Designs",
  },

  4: {
    title: "Funeral Announcement Flyer",
    category: "Funeral Designs",
  },

  7: {
  title: "Funeral Celebration Flyer",
  category: "Funeral Designs",
},

  8: {
    title: "Product Packaging & Brochure Design",
    category: "Brochures",
  },

  9: {
  title: "Cocoa Festival Church Flyer",
  category: "Church Flyers",
},

  10: {
    title: "District Week Church Flyer",
    category: "Church Flyers",
  },

  12: {
    title: "Restaurant Food Advertisement",
    category: "Restaurant & Food Flyers",
  },

  14: {
    title: "Afro Genesis Party Flyer",
    category: "Party & Event Flyers",
  },

  15: {
    title: "Product Brochure Mockup",
    category: "Brochures",
  },

  16: {
    title: "Restaurant Menu Design",
    category: "Restaurant & Food Flyers",
  },

  17: {
    title: "Funeral Brochure Design",
    category: "Funeral Designs",
  },

  18: {
    title: "Funeral Celebration Design",
    category: "Funeral Designs",
  },

  19: {
    title: "Shabach Church Programme",
    category: "Church Flyers",
  },
};

/* ==========================================
   INDIVIDUAL NAMED PROJECTS
========================================== */

const namedProjects = {
  "church.jpg": {
    title: "Shabach Church Event Banner",
    category: "Church Flyers",
  },

  "label.jpg": {
    title: "Product Label Design",
    category: "Product Labels & Packaging",
  },

  "politics.jpg": {
    title: "Political Campaign Billboard",
    category: "Political Campaigns",
  },
};

/* ==========================================
   IDENTIFY PROJECT BY FILE NAME
========================================== */

function getProjectDetails(filename) {
  const flyerMatch = filename.match(
    /^new fly \((\d+)\)\.(jpg|jpeg|png|webp)$/i
  );

  if (flyerMatch) {
    return (
      selectedFlyers[Number(flyerMatch[1])] || null
    );
  }

  /* CHURCH FLYERS */

  const churchMatch = filename.match(
    /^church \((\d+)\)\.(jpg|jpeg|png|webp)$/i
  );

  if (churchMatch) {
    return {
      title: `Church Ministry Flyer ${churchMatch[1]}`,
      category: "Church Flyers",
    };
  }

  /* POLITICAL CAMPAIGN DESIGNS */

  const politicsMatch = filename.match(
    /^politics \((\d+)\)\.(jpg|jpeg|png|webp)$/i
  );

  if (politicsMatch) {
    return {
      title: `Political Campaign Design ${politicsMatch[1]}`,
      category: "Political Campaigns",
    };
  }

  /* PRODUCT LABEL DESIGNS */

  const labelMatch = filename.match(
    /^label \((\d+)\)\.(jpg|jpeg|png|webp)$/i
  );

  if (labelMatch) {
    return {
      title: `Product Label Design ${labelMatch[1]}`,
      category: "Product Labels & Packaging",
    };
  }

  return namedProjects[filename.toLowerCase()] || null;
}

/* ==========================================
   BUILD PORTFOLIO ITEMS
========================================== */

export const portfolioItems = Object.entries(imageModules)
  .map(([path, image]) => {
    const filename = path.split("/").pop();

    const details = getProjectDetails(filename);

    if (!details) return null;

    return {
      id: filename,

      title: details.title,

      category: details.category,

      image,

      description:
        details.description ||
        `A creative ${details.category.toLowerCase()} project designed by Ben Creations.`,
    };
  })
  .filter(Boolean)
  .sort((a, b) =>
    a.title.localeCompare(b.title, undefined, {
      numeric: true,
    })
  );
