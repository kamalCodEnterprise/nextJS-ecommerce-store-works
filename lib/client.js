import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


export const client = sanityClient(
    {
        projectId: '7h1zyz7i',
        dataset : 'production',
        apiVersion : '2022-03-10',
        useCdn : true,
        token : process.env.NEXT_PLUBLIC_SANITY_TOKEN
    }
)
const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
