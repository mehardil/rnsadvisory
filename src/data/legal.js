import siteConfig from '../config/siteConfig.js'

const contactLine = `If you have questions about this document, contact ${siteConfig.brand.legalName} at ${siteConfig.contact.email} or ${siteConfig.contact.phoneDisplay}.`

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    updated: '1 October 2026',
    summary:
      'How RNS Global collects, uses, shares and protects personal information when you use this website or engage our services.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `${siteConfig.brand.legalName} is an advisory firm with its head office at ${siteConfig.brand.streetAddress}, ${siteConfig.brand.city}, ${siteConfig.brand.country}. We are the controller of personal information collected through this website and, depending on the engagement, a controller or processor of information you share with our advisory teams.`,
          contactLine,
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'We collect information you provide directly: your name, contact details, country of residence, the service you are interested in, budget range, preferred contact method and any message or documents you send. For client engagements we may also collect identity documents, financial information, employment details and family information where required to deliver the service.',
          'We collect limited technical information automatically, such as browser type, device type, approximate location derived from IP address, pages viewed and referral source. This is used to keep the site secure and understand which content is useful.',
        ],
        bullets: [
          'Contact and enquiry details',
          'Identity and KYC documents required by law or by banks and authorities',
          'Engagement correspondence and files',
          'Website usage and device information',
        ],
      },
      {
        heading: 'How we use information',
        paragraphs: [
          'We use personal information to respond to enquiries, provide and administer services, meet legal and regulatory obligations, manage payments, improve our website and, where you have opted in, send briefings. We do not sell personal information.',
          'Where we rely on consent, you may withdraw it at any time. Where we rely on contract or legitimate interests, we balance our interests against your rights and limit processing to what is necessary.',
        ],
      },
      {
        heading: 'Sharing and international transfers',
        paragraphs: [
          'We share information only where necessary: with our regional offices, licensed local counsel, government authorities, banks, universities, insurers and technology providers acting on our instructions. All providers are bound by confidentiality and data-protection terms.',
          'Because we operate across eight regions, information may be transferred outside your country. We use contractual safeguards and limit transfers to what the engagement requires.',
        ],
      },
      {
        heading: 'Retention and security',
        paragraphs: [
          'We retain engagement records for the period required by applicable law and professional standards, and enquiry records for up to 24 months unless a relationship develops. We use access controls, encryption in transit, need-to-know permissions and documented retention schedules.',
          'No system is completely secure. If a breach affects your rights, we will notify you and the relevant authority as required by law.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Depending on your jurisdiction, you may have the right to access, correct, delete, restrict or object to processing, request portability, or withdraw consent. To exercise a right, email us with enough information to identify your file. We respond within the time required by law.',
          'You also have the right to complain to your local data-protection authority. We would appreciate the chance to resolve your concern first.',
        ],
      },
      {
        heading: 'Cookies and analytics',
        paragraphs: [
          'Essential cookies are used to operate the site. Analytics and marketing cookies load only after you consent through the cookie banner. See the Cookie Policy for details and controls.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'We may update this policy to reflect legal or operational changes. The updated date at the top of this page will change, and material changes will be communicated where appropriate.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: '1 October 2026',
    summary:
      'The terms that govern your use of this website and the basis on which RNS Global provides advisory services.',
    sections: [
      {
        heading: 'Use of this website',
        paragraphs: [
          'This website is provided for information and enquiry purposes. You agree not to misuse it, attempt to gain unauthorised access, scrape it at scale, or use it in a way that interferes with other visitors.',
          'Content on this site is general information and does not constitute legal, tax, immigration or investment advice. Advice is provided only under a signed engagement letter that defines scope, fees and responsibilities.',
        ],
      },
      {
        heading: 'Engagements, quotes and fees',
        paragraphs: [
          'A client relationship begins only when both parties sign an engagement letter or you accept a written proposal. Quotations are valid for 30 days unless stated otherwise and assume the information you provided is accurate.',
          'Fees are fixed where possible and itemised in the engagement letter. Government fees, third-party charges, translations and courier costs are typically additional and are disclosed before incurrence. Invoices are payable on the terms stated and may be subject to late-payment charges.',
        ],
      },
      {
        heading: 'Client responsibilities',
        paragraphs: [
          'You are responsible for providing accurate, complete and timely information and documents, and for telling us promptly if circumstances change. We rely on the accuracy of what you provide.',
          'You must not ask us to submit false or misleading information. If we believe a document or statement is inaccurate, we may decline to proceed or withdraw from the engagement.',
        ],
      },
      {
        heading: 'No guarantee of outcome',
        paragraphs: [
          'Visa approvals, university admissions, bank account opening, licensing decisions, investment returns and regulatory outcomes are controlled by third parties. We do not guarantee any outcome. We commit to preparing your matter diligently and advising you honestly on the risks.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The RNS Global name, logo, site design, text and generated artwork are protected by intellectual-property laws. You may view and print pages for personal or internal business use. You may not reproduce, republish or create derivative works without written permission.',
          'Documents we prepare for you under an engagement may be used for the purpose for which they were prepared.',
        ],
      },
      {
        heading: 'Third-party links and services',
        paragraphs: [
          'This site links to third-party websites and uses third-party services. We are not responsible for their content, availability or privacy practices. A link does not imply endorsement.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'To the maximum extent permitted by law, our liability arising from use of this website is limited to the amount you paid us for the relevant service. We are not liable for indirect or consequential loss, including lost profits or opportunities.',
          'Nothing in these terms limits liability for fraud, wilful misconduct, or any liability that cannot lawfully be excluded.',
        ],
      },
      {
        heading: 'Governing law and changes',
        paragraphs: [
          'These terms are governed by the laws of the United Arab Emirates, and the courts of Dubai have non-exclusive jurisdiction. We may update these terms from time to time; the version on this page applies to your use of the site.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: '1 October 2026',
    summary: 'What cookies this site uses, why, and how you can control them.',
    sections: [
      {
        heading: 'What cookies are',
        paragraphs: [
          'Cookies are small text files stored on your device. They help websites remember preferences, keep sessions secure and understand how pages are used. We also use similar technologies such as local storage for form drafts and checklist progress.',
        ],
      },
      {
        heading: 'Essential cookies and storage',
        paragraphs: [
          'These are required for the site to work and cannot be switched off through our banner. They include your theme and language preferences, cookie consent choice, form drafts, checklist progress and security controls.',
        ],
      },
      {
        heading: 'Analytics cookies',
        paragraphs: [
          'With your consent, we load Google Analytics to understand which pages are useful, how visitors arrive and where they encounter difficulty. We configure IP anonymisation where supported. Analytics cookies do not load until you opt in.',
        ],
      },
      {
        heading: 'Marketing cookies',
        paragraphs: [
          'With your consent, we may use the Meta Pixel to measure campaign performance. These cookies are not loaded by default and are never required to use the site.',
        ],
      },
      {
        heading: 'Managing your choices',
        paragraphs: [
          'You can change your choice at any time by clearing this site’s data in your browser and reloading, or by using your browser’s cookie controls. Blocking essential storage may affect form autosave, checklist progress and theme preferences.',
          'Most browsers also offer a “do not track” or global privacy control. We honour explicit consent choices recorded through our banner.',
        ],
      },
      {
        heading: 'Updates',
        paragraphs: [
          'If we introduce new categories of cookies, we will update this policy and, where required, ask for consent again.',
        ],
      },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    updated: '1 October 2026',
    summary: 'Important limits on the information provided on this website.',
    sections: [
      {
        heading: 'General information only',
        paragraphs: [
          'The content on this website is general information about our services and the markets we work in. It is not legal, tax, immigration, financial or investment advice, and it is not a substitute for advice on your specific circumstances.',
          'Reading this website, using a free tool or sending an enquiry does not create a client relationship. A relationship begins only under a signed engagement letter.',
        ],
      },
      {
        heading: 'Rules and figures change',
        paragraphs: [
          'Immigration rules, tax rates, licensing requirements, tuition fees and currency rates change frequently. Estimates and checklists on this site are indicative and dated. Always confirm the current position with a qualified advisor before acting or paying a fee.',
        ],
      },
      {
        heading: 'Outcomes are not guaranteed',
        paragraphs: [
          'We do not guarantee visa approval, admission, licensing, bank account opening, fundraising or investment returns. Decisions rest with governments, institutions, banks and markets.',
        ],
      },
      {
        heading: 'Third-party content',
        paragraphs: [
          'Links to third-party websites are provided for convenience. We do not control and are not responsible for their content, accuracy or availability.',
        ],
      },
      {
        heading: 'Testimonials and case studies',
        paragraphs: [
          'Client stories are illustrative. Names and identifying details are changed where confidentiality applies. Results depend on individual circumstances and are not a promise of similar outcomes.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the extent permitted by law, RNS Global accepts no liability for loss arising from reliance on general information on this website. Our liability for engaged services is governed by the relevant engagement letter and the Terms of Service.',
        ],
      },
    ],
  },
}

export const legalSlugs = Object.keys(legalPages)
export const getLegalPage = (slug) => legalPages[slug] || null
