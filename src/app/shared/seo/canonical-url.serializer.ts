import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { PAGE_METADATA } from './page-metadata';

const DEMO_PATHS: readonly string[] = [PAGE_METADATA.capture.path, PAGE_METADATA.dashboard.path, PAGE_METADATA.integration.path];

/** Netlify serves directory URLs; Angular matches the existing demo route paths. */
@Injectable()
export class CanonicalUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    const suffixIndex = url.search(/[?#]/);
    const path = suffixIndex < 0 ? url : url.slice(0, suffixIndex);
    const normalizedPath = path.replace(/\/+$/, '');
    if (path !== normalizedPath && DEMO_PATHS.includes(normalizedPath)) {
      return super.parse(normalizedPath + (suffixIndex < 0 ? '' : url.slice(suffixIndex)));
    }
    return super.parse(url);
  }
}
