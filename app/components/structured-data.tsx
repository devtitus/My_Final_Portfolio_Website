export function PersonSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Melwyn Titus",
        "url": "https://www.melwyn.co.in",
        "image": "https://www.melwyn.co.in/titus-pic.webp",
        "jobTitle": "Full Stack Developer & Product Engineer",
        "worksFor": {
            "@type": "Organization",
            "name": "FameKeeda"
        },
        "sameAs": [
            "https://github.com/devtitus",
            "https://www.linkedin.com/in/melwyn-john-8125bb214"
        ],
        "knowsAbout": [
            "Web Development",
            "React",
            "Next.js",
            "Node.js",
            "TypeScript",
            "Product Engineering"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function WebsiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Melwyn Titus Portfolio",
        "url": "https://www.melwyn.co.in",
        "description": "Full Stack Developer & Product Engineer portfolio",
        "author": {
            "@type": "Person",
            "name": "Melwyn Titus"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Melwyn Titus",
        "url": "https://www.melwyn.co.in",
        "logo": "https://www.melwyn.co.in/android-chrome-512x512.png",
        "sameAs": [
            "https://github.com/devtitus",
            "https://www.linkedin.com/in/melwyn-john-8125bb214"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
