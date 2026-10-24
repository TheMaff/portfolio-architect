import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PRIMARY_OUTLET, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { canonicalUrl, PAGE_METADATA, PageMetadata, SITE_URL, SOCIAL_IMAGE_URL } from './page-metadata';

/** Updates both prerendered HTML and metadata after client-side navigation. */
@Injectable()
export class SiteTitleStrategy extends TitleStrategy {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route = snapshot.root;
    let metadata: PageMetadata = PAGE_METADATA.notFound;
    while (route) {
      if (route.data['seo']) metadata = route.data['seo'] as PageMetadata;
      const child = route.children.find(candidate => candidate.outlet === PRIMARY_OUTLET);
      if (!child) break;
      route = child;
    }

    const url = canonicalUrl(metadata.path);
    this.title.setTitle(metadata.title);
    this.meta.updateTag({ name: 'description', content: metadata.description });
    this.meta.updateTag({ name: 'robots', content: metadata.noindex ? 'noindex, follow' : 'index, follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_CL' });
    this.meta.updateTag({ property: 'og:site_name', content: 'The Maff' });
    this.meta.updateTag({ property: 'og:title', content: metadata.title });
    this.meta.updateTag({ property: 'og:description', content: metadata.description });
    this.meta.updateTag({ property: 'og:image', content: SOCIAL_IMAGE_URL });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'The Maff. Automatización, CRM, integraciones y dashboards para empresas.' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: metadata.title });
    this.meta.updateTag({ name: 'twitter:description', content: metadata.description });
    this.meta.updateTag({ name: 'twitter:image', content: SOCIAL_IMAGE_URL });
    this.meta.updateTag({ name: 'twitter:image:alt', content: 'The Maff. Automatización, CRM, integraciones y dashboards para empresas.' });

    // A 404 must not inherit the preceding page's canonical URL or structured data.
    this.document.head.querySelectorAll('link[rel="canonical"]').forEach(element => element.parentNode?.removeChild(element));
    this.document.getElementById('the-maff-structured-data')?.remove();
    if (metadata.noindex) {
      this.meta.removeTag('property="og:url"');
      return;
    }

    const canonical = this.document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    this.document.head.appendChild(canonical);
    this.meta.updateTag({ property: 'og:url', content: url });

    const schema = this.document.createElement('script');
    schema.setAttribute('id', 'the-maff-structured-data');
    schema.setAttribute('type', 'application/ld+json');
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: 'The Maff',
          inLanguage: 'es-CL',
          publisher: { '@id': `${SITE_URL}/#marcos-flores` }
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#marcos-flores`,
          name: 'Marcos Flores',
          url: `${SITE_URL}/`,
          image: `${SITE_URL}/assets/marcos-flores-perfil.png`,
          sameAs: ['https://www.linkedin.com/in/maff-dev/', 'https://github.com/TheMaff']
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: metadata.title,
          description: metadata.description,
          inLanguage: 'es-CL',
          isPartOf: { '@id': `${SITE_URL}/#website` }
        }
      ]
    }).replace(/</g, '\\u003c');
    this.document.head.appendChild(schema);
  }
}
