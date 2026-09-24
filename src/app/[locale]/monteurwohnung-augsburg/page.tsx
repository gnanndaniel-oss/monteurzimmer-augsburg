import { pageMetadata } from '@/lib/meta';
import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';
import { getPageContent } from '@/lib/markdown';
import { ContentIntro, ContentBody, PhotoGallery } from '@/components/SeoContent';
import { GALLERY_MONTEURWOHNUNG } from '@/content/images';
import { UI, asLoc, localizePhoto } from '@/lib/ui-i18n';
import {  generateAlternates, generateOgMeta , generateBreadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata('apartment', 'monteurwohnung-augsburg', locale);
}

export default async function MonteurwohnungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.apartment },
  ], locale);
  setRequestLocale(locale);
  const content = getPageContent(locale, 'monteurwohnung');
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <CategoryPage
      intro={content ? <ContentIntro nodes={content.intro} /> : null}
      titleKey="apartmentPage.title"
      descKey="apartmentPage.desc"
      images={[
        '/attachments/Image/monteurwohnung-augsburg-ansicht.jpg',
        '/attachments/Image/monteurwohnung-augsburg-zimmer.jpg',
      ]}
      pricing={[
        { labelKey: 'pricing.apt4', priceKey: 'pricing.apt4Price' },
        { labelKey: 'pricing.apt6', priceKey: 'pricing.apt6Price' },
        { labelKey: 'pricing.apt10', priceKey: 'pricing.apt10Price' },
        { labelKey: 'pricing.apt20', priceKey: 'pricing.apt20Price' },
      ]}
    >
      {content && <PhotoGallery photos={GALLERY_MONTEURWOHNUNG.map((p) => localizePhoto(p, locale))} title={UI[asLoc(locale)].galleryApartment} />}
      {content && <ContentBody nodes={content.body} faq={content.faq} faqTitle={content.faqTitle} />}
    </CategoryPage>
    </>
    );
}
