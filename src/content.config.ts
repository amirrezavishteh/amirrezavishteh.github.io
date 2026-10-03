// Content collections. Field names match public/admin/config.yml exactly, so
// anything saved from the admin panel validates here at build time.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_CATEGORIES } from './lib/constants';

// The CMS writes "" (or null) for optional fields left blank — treat as absent.
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const optStr = z.preprocess(blank, z.string().optional());
const optDate = z.preprocess(blank, z.coerce.date().optional());
const optNum = z.preprocess(blank, z.coerce.number().int().optional());
const order = z.preprocess(blank, z.coerce.number().int().default(100));
const list = z.preprocess((v) => blank(v) ?? [], z.array(z.string()));

const md = (dir: string) => glob({ pattern: '**/*.md', base: `./src/content/${dir}` });

const blog = defineCollection({
  loader: md('blog'),
  schema: z.object({
    title: z.string(),
    description: z.preprocess(blank, z.string().default('')),
    date: z.coerce.date(),
    updated: optDate,
    cover: optStr,
    coverAlt: optStr,
    tags: list,
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: md('publications'),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    year: z.coerce.number().int(),
    type: z.enum(['Journal article', 'Conference paper', 'Preprint', 'Book chapter', 'Thesis', 'Workshop paper']),
    status: z.enum(['Published', 'Under review', 'Preprint', 'In progress']).default('Published'),
    venue: z.string(),
    summary: optStr,
    url: optStr,
    doi: optStr,
    arxiv: optStr,
    pdf: optStr,
    code: optStr,
    presentation: optStr,
    note: optStr,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order,
  }),
});

const projects = defineCollection({
  loader: md('projects'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(PROJECT_CATEGORIES),
    repo: optStr,
    demo: optStr,
    post: optStr,
    language: optStr,
    license: optStr,
    topics: list,
    period: optStr,
    fork: z.boolean().default(false),
    upstream: optStr,
    featured: z.boolean().default(false),
    hidden: z.boolean().default(false),
    order,
    stars: optNum,
  }),
});

const certificates = defineCollection({
  loader: md('certificates'),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    platform: z.enum(['Coursera', 'Udemy', 'Kaggle', '365 Data Science', 'LinkedIn Learning', 'edX', 'Other']).default('Coursera'),
    kind: z.enum(['Specialization', 'Professional Certificate', 'Program', 'Course', 'Seminar']).default('Course'),
    ai: z.boolean().default(false),
    date: optDate,
    image: optStr,
    verify: optStr,
    details: optStr,
    order,
  }),
});

const albums = defineCollection({
  loader: md('albums'),
  schema: z.object({
    title: z.string(),
    category: z.enum(['Academic', 'Life']).default('Life'),
    period: optStr,
    date: optDate,
    description: optStr,
    cover: optStr,
    order,
    draft: z.boolean().default(false),
    images: z.preprocess(
      (v) => blank(v) ?? [],
      z.array(z.object({ src: z.string(), caption: optStr })),
    ),
  }),
});

export const collections = { blog, publications, projects, certificates, albums };
