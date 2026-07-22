/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'buc8lir0',
  dataset: 'andres-prod',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const mainPageData = {
  _type: 'mainPage',
  title: 'Tootmisjuhtimine.ee - Main Page',
  eyebrow: '2026 programm on avatud',
  headline: 'Tootmisjuhtimine,',
  scriptHeadline: 'mis tegelikult toimib',
  subtitle: '9-päevane intensiivprogramm tootmisjuhtidele,\nkes tahavad reaalseid tulemusi.',
  primaryCta: {
    text: 'Registreeru programmi',
    url: '#register'
  },
  secondaryCta: {
    text: 'Vaata programmi',
    url: '#program'
  },
  socialProof: {
    text: 'on juba läbinud',
    highlight: '147 tootmisjuhti'
  },
  stats: [
    {
      number: '147',
      suffix: '+',
      label: 'Lõpetajat'
    },
    {
      number: '9',
      suffix: '',
      label: 'Päeva'
    },
    {
      number: '25',
      suffix: '+',
      label: 'Aastat'
    },
    {
      number: '+38',
      suffix: '%',
      label: 'Efektiivsus'
    }
  ],
  features: [
    {
      title: 'Mõõdetavad tulemused',
      description: 'KPI, OEE ja reaalsed näitajad',
      icon: 'blue',
      svgIcon: '<rect x="3" y="11" width="3" height="6" rx="1" fill="#0071e3" opacity="0.8"/><rect x="8.5" y="7" width="3" height="10" rx="1" fill="#0071e3"/><rect x="14" y="4" width="3" height="13" rx="1" fill="#0071e3" opacity="0.9"/>'
    },
    {
      title: 'Päris tehased',
      description: '2 ettevõttekülastust programmi sees',
      icon: 'orange',
      svgIcon: '<path d="M3 16V9L7 6L10 7.5L13 5L17 8V16" stroke="#ff9f0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><rect x="8" y="11" width="4" height="5" rx="1" fill="#ff9f0a" opacity="0.8"/>'
    },
    {
      title: 'Väike grupp',
      description: 'Kuni 16 osalejat, isiklik lähenemine',
      icon: 'purple',
      svgIcon: '<circle cx="7.5" cy="7" r="2.8" stroke="#bf5af2" strokeWidth="1.5" fill="none"/><circle cx="13.5" cy="7" r="2.2" stroke="#bf5af2" strokeWidth="1.3" fill="none" opacity="0.6"/><path d="M3 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="#bf5af2" strokeWidth="1.5" strokeLinecap="round" fill="none"/><path d="M13.5 12c1.8 0 3.5 1.2 3.5 3.5" stroke="#bf5af2" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/>'
    },
    {
      title: 'Rahvusvaheline tunnistus',
      description: 'Sertifikaat ja ametlik diplom',
      icon: 'green',
      svgIcon: '<rect x="4" y="3" width="12" height="14" rx="2" stroke="#34c759" strokeWidth="1.5" fill="none"/><path d="M7 7.5h6" stroke="#34c759" strokeWidth="1.3" strokeLinecap="round"/><path d="M7 10h4" stroke="#34c759" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/><circle cx="10" cy="13.5" r="2" stroke="#34c759" strokeWidth="1.2" fill="none"/><path d="M9 13.5l.8 1L11.8 12" stroke="#34c759" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>'
    }
  ],
  partnersTitle: 'Osalenud'
};

async function createMainPage() {
  try {
    // First, check if a main page already exists
    const existingPages = await client.fetch('*[_type == "mainPage"]');
    
    if (existingPages.length > 0) {
      console.log('Main page already exists. Updating existing document...');
      const result = await client.patch(existingPages[0]._id).set(mainPageData).commit();
      console.log('Main page updated successfully:', result._id);
    } else {
      console.log('Creating new main page...');
      const result = await client.create(mainPageData);
      console.log('Main page created successfully:', result._id);
    }
  } catch (error) {
    console.error('Error creating/updating main page:', error);
  }
}

createMainPage();
