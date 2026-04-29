import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const nullableString = z.string().nullable().optional().transform((v) => v ?? undefined);

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      project_date: z.coerce.date().optional(),
      display_project_date: z.union([z.string(), z.number()]).transform(String).optional(),
      description: z.string(),
      link: nullableString,
      tags: z.array(z.string()).default([]),
      technical: nullableString,
      media: z
        .array(
          z.object({
            image: image().optional(),
            gif: image().optional(),
            video: nullableString,
            embed: nullableString,
            alt: nullableString,
            caption: nullableString,
          })
        )
        .default([]),
    }),
});

export const collections = { work };
