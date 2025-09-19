import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/image';

const components = {
  marks: {
    link: ({ children, value }: any) => {
      const target = value?.openInNewTab ? '_blank' : undefined;
      const rel = value?.openInNewTab ? 'noopener noreferrer' : undefined;
      return (
        <a href={value?.href} target={target} rel={rel}>
          {children}
        </a>
      );
    },
    textColor: ({ children, value }: any) => (
      <span style={{ color: value?.color || 'inherit' }}>{children}</span>
    ),
    bgColor: ({ children, value }: any) => (
      <span style={{ backgroundColor: value?.color || 'transparent' }}>{children}</span>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const src = value?.asset ? urlFor(value).width(1200).url() : value?.url;
      if (!src) return null;
      const img = <img src={src} alt={value?.alt || ''} loading="lazy" />;
      return value?.link ? <a href={value.link}>{img}</a> : img;
    },
    separator: ({ value }: any) => {
      const { style = 'solid', color = '#e5e7eb', thickness = 1, width = '100%', align = 'center' } = value || {};
      const margin = align === 'left' ? '0 auto 0 0' : align === 'right' ? '0 0 0 auto' : '0 auto';
      return <hr style={{ border: 0, borderTop: `${thickness}px ${style} ${color}`, width, margin }} />;
    },
    table: ({ value }: any) => {
      const { caption, border = true, rows = [], align = 'center' } = value || {};
      const style = { marginLeft: align === 'left' ? 0 : 'auto', marginRight: align === 'right' ? 0 : 'auto' };
      return (
        <figure style={style}>
          <table className={border ? 'with-borders' : 'no-borders'}>
            <tbody>
              {rows?.map((row: any, r: number) => (
                <tr key={r}>
                  {row?.cells?.map((cell: any, c: number) => (
                    <td
                      key={c}
                      colSpan={cell?.colSpan || 1}
                      rowSpan={cell?.rowSpan || 1}
                      style={{ textAlign: cell?.align, background: cell?.bg }}
                    >
                      <PortableText value={cell?.content || []} components={components} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      );
    },
    faqList: ({ value }: any) => (
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading">FAQs</h2>
        <div>
          {(value?.items || []).map((f: any, i: number) => (
            <details key={i} open>
              <summary>{f?.question}</summary>
              <PortableText value={f?.answer || []} components={components} />
            </details>
          ))}
        </div>
      </section>
    ),

    embed: ({ value }: any) => {
      if (value?.html) return <div dangerouslySetInnerHTML={{ __html: value.html }} />;
      if (value?.url) return <iframe src={value.url} loading="lazy" />;
      return null;
    },
    video: ({ value }: any) => {
      if (value?.url) return <iframe src={value.url} title={value?.caption || 'Video'} loading="lazy" allowFullScreen />;
      return null;
    },
  },
};

export default function BodyRenderer({ value }: { value: any }) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }
  return <PortableText value={value} components={components} />;
}
