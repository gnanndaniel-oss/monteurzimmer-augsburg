import { pageMetadata } from '@/lib/meta';
import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';
import { getPageContent } from '@/lib/markdown';
import { ContentIntro, ContentBody, PhotoGallery } from '@/components/SeoContent';
import { GALLERY_MONTEURAPARTMENT } from '@/content/images';
import { UI, asLoc, localizePhoto } from '@/lib/ui-i18n';
import {  generateAlternates, generateOgMeta , generateBreadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata('monteurapartment', 'monteurapartment-augsburg', locale);
}

export default async function MonteurapartmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.monteurapartment },
  ], locale);
  setRequestLocale(locale);
  const content = getPageContent(locale, 'monteurapartment');
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <CategoryPage
      intro={content ? <ContentIntro nodes={content.intro} /> : null}
      titleKey="monteurapartmentPage.title"
      descKey="monteurapartmentPage.desc"
      images={[
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-1.jpg',
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-2.jpg',
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-3.jpg',
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-4.jpg',
      ]}
      pricing={[
        { labelKey: 'pricing.aptSingle', priceKey: 'pricing.aptSinglePrice' },
        { labelKey: 'pricing.apt2', priceKey: 'pricing.apt2Price' },
        { labelKey: 'pricing.apt4Small', priceKey: 'pricing.apt4SmallPrice' },
      ]}
    >
      {content && <PhotoGallery photos={GALLERY_MONTEURAPARTMENT.map((p) => localizePhoto(p, locale))} title={UI[asLoc(locale)].galleryStudio} />}
      {content && <ContentBody nodes={content.body} faq={content.faq} faqTitle={content.faqTitle} />}
    </CategoryPage>
    </>
    );
}
