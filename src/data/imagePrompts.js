/**
 * Prompt library for the optional AI image pipeline (`npm run generate:images`).
 * Every prompt uses the same house style so generated covers feel like one system.
 *
 * The browser never imports this file — it only requests `/generated/<key>.webp`
 * and falls back to procedural generative art when a file is missing.
 */
import { serviceCategories } from './services.js'
import { industries } from './industries.js'
import { locations } from './locations.js'
import { articles } from './articles.js'

export const houseStyle =
  "premium corporate editorial illustration, deep navy and gold palette, soft volumetric light, 3D isometric glass and metallic elements, clean minimal composition, no text, no logos, no real people's faces, ultra high quality"

const prompt = (subject) => `${subject}, ${houseStyle}`

const citySubjects = {
  dubai: 'the Dubai skyline with the DIFC towers and a gold horizon',
  'jebel-ali': 'Jebel Ali port cranes and stacked containers at blue hour',
  riyadh: 'the Riyadh skyline with modern towers and warm desert haze',
  mumbai: 'the Mumbai skyline with Bandra Kurla Complex towers and monsoon light',
  lahore: 'Lahore’s modern cityscape with Mughal architectural motifs and warm light',
  london: 'the London skyline with the City and Shoreditch glass towers in soft rain light',
  frankfurt: 'the Frankfurt banking district skyline with the Main river',
  tallinn: 'Tallinn’s old town spires and modern glass towers under Baltic light',
  'new-york': 'the Manhattan skyline from Midtown at dusk',
}

export const fixedPrompts = {
  'home-hero': {
    prompt: prompt(
      'a luminous wireframe globe wrapped in a particle network suspended above a stylised Gulf skyline at dusk, floating glass polyhedra and thin gold orbit rings, cinematic depth',
    ),
    aspect: '16:9',
  },
  'home-cta': {
    prompt: prompt(
      'an abstract aurora of navy and gold light flowing across a dark horizon with floating glass fragments, calm and premium',
    ),
    aspect: '21:9',
  },
  'service-orbit': {
    prompt: prompt(
      'a central glass core orbited by six floating geometric service icons made of glass and brushed gold, deep navy background, soft bloom',
    ),
    aspect: '1:1',
  },
  'about-story': {
    prompt: prompt(
      'an abstract topographic map made of gold contour lines over deep navy, with a single luminous route connecting continents',
    ),
    aspect: '16:9',
  },
  'about-team': {
    prompt: prompt(
      'abstract glass human silhouettes standing in a circle of soft volumetric light, navy and gold, faceless, editorial',
    ),
    aspect: '16:9',
  },
  'about-values': {
    prompt: prompt(
      'six floating glass prisms arranged in a circle, each catching a different angle of gold light, deep navy background',
    ),
    aspect: '4:3',
  },
  'contact-hero': {
    prompt: prompt(
      'a calm architectural interior with navy glass walls, a gold horizon line and a single illuminated desk, no people',
    ),
    aspect: '16:9',
  },
  'careers-hero': {
    prompt: prompt(
      'an ascending staircase of glass and gold steps floating in deep navy space, a metaphor for growth',
    ),
    aspect: '16:9',
  },
  'portal-hero': {
    prompt: prompt(
      'an abstract secure digital vault made of frosted glass and gold circuitry, navy background',
    ),
    aspect: '16:9',
  },
  'tools-hero': {
    prompt: prompt(
      'abstract floating glass instruments, compass, calipers and a ruler, arranged like a modern still life in navy and gold',
    ),
    aspect: '16:9',
  },
  'insights-hero': {
    prompt: prompt(
      'a constellation of floating paper-like glass panels connected by gold lines over deep navy, editorial knowledge theme',
    ),
    aspect: '16:9',
  },
  'locations-hero': {
    prompt: prompt(
      'a stylised night-time Earth with gold city lights and thin luminous arcs connecting Dubai to eight regions',
    ),
    aspect: '16:9',
  },
  'case-studies-hero': {
    prompt: prompt(
      'abstract ascending bar chart made of glass and gold blocks on a navy plinth, soft volumetric light',
    ),
    aspect: '16:9',
  },
  'og-default': {
    prompt: prompt(
      'a premium abstract composition of a wireframe globe, gold orbit lines and glass geometric shards on deep navy, generous empty space for text overlay',
    ),
    aspect: '1200x630',
  },
  'blog-default': {
    prompt: prompt('abstract layered navy and gold waves with a single floating glass prism'),
    aspect: '16:9',
  },
}

const teamPrompts = {
  'team-rs': 'an abstract glass bust silhouette with a gold rim light, faceless, navy background',
  'team-as': 'an abstract glass bust silhouette with a warm gold rim light, faceless, navy background',
  'team-pr': 'an abstract glass bust silhouette with a soft blue rim light, faceless, navy background',
  'team-hm': 'an abstract glass bust silhouette with a champagne gold rim light, faceless, navy background',
  'team-yk': 'an abstract glass bust silhouette with a deep blue rim light, faceless, navy background',
  'team-do': 'an abstract glass bust silhouette with a cool gold rim light, faceless, navy background',
}

const servicePrompt = (category, svc) =>
  prompt(
    `a premium editorial cover representing ${svc.title} within ${category.title}, using abstract ${category.icon === 'GraduationCap' ? 'books, arches and light' : category.icon === 'Plane' ? 'flight paths and horizon light' : category.icon === 'Stamp' ? 'passport forms, seals and gold arcs' : category.icon === 'Building2' ? 'glass towers and blueprint lines' : category.icon === 'Compass' ? 'navigation instruments and contour lines' : category.icon === 'LineChart' ? 'ascending glass bars and gold curves' : category.icon === 'Scale' ? 'balanced glass forms and gold rules' : category.icon === 'Container' ? 'containers, cranes and shipping lanes' : category.icon === 'Users' ? 'connected glass nodes and human-scale forms' : category.icon === 'Cpu' ? 'circuit lines, glass chips and data lattices' : category.icon === 'Home' ? 'architectural volumes and warm interior light' : 'orbiting glass forms and gold particles'} symbols, deep navy background, no text`,
  )

export function getPromptLibrary() {
  const library = { ...fixedPrompts }

  Object.values(teamPrompts).forEach((_, i) => {
    const key = Object.keys(teamPrompts)[i]
    library[key] = { prompt: prompt(teamPrompts[key]), aspect: '3:4' }
  })

  serviceCategories.forEach((category) => {
    library[`category-${category.slug}`] = {
      prompt: prompt(
        `a premium editorial cover for the ${category.title} advisory practice, abstract geometric composition with subtle ${category.title.toLowerCase()} symbols, deep navy and gold`,
      ),
      aspect: '4:3',
    }
    category.services.forEach((svc) => {
      library[`service-${category.slug}-${svc.slug}`] = {
        prompt: servicePrompt(category, svc),
        aspect: '4:3',
      }
    })
  })

  industries.forEach((industry) => {
    library[`industry-${industry.slug}`] = {
      prompt: prompt(
        `a premium editorial cover for the ${industry.title} sector, abstract ${industry.tagline.toLowerCase()} imagery in glass and gold, deep navy background`,
      ),
      aspect: '4:3',
    }
  })

  locations.forEach((loc) => {
    library[`location-${loc.id}`] = {
      prompt: prompt(
        `${citySubjects[loc.id] || loc.city}, architectural editorial illustration with gold light accents, no text, no logos`,
      ),
      aspect: '4:3',
    }
  })

  articles.forEach((article) => {
    library[`article-${article.slug}`] = {
      prompt: prompt(article.heroPrompt),
      aspect: '16:9',
    }
  })

  return library
}

export const imagePrompts = getPromptLibrary()

export const imageKeys = Object.keys(imagePrompts)

export const aiImagePath = (key) => `/generated/${key}.webp`

export default imagePrompts
