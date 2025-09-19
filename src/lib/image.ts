import imageUrlBuilder from '@sanity/image-url';
import { sanity } from './sanityClient';

const builder = imageUrlBuilder(sanity);
export const urlFor = (src: any) => builder.image(src);
