import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'voidis.me',
        short_name: 'voidis',
        description: 'A collection of small features, demos and learning notes.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        orientation: 'portrait',
        icons: [
            {
                src: '/images/orange.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    };
}
