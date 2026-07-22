export const kontaktSectionsGroq = `
  _type == "kontaktHeroBlock" => {
    _type,
    _key,
    eyebrow,
    pageTitle,
    intro,
    image {
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    }
  },
  _type == "kontaktQuickBlock" => {
    _type,
    _key,
    sectionTitle,
    labelEmail,
    labelPhone,
    labelAddress,
    labelResponse,
    emails,
    phoneDisplay,
    phoneTel,
    addressStreet,
    addressPostalCode,
    addressCity,
    addressCountry,
    responseNote,
    mapLinkLabel,
    mapQuery,
    emailButtonText,
    phoneButtonText,
    primaryEmailForButtons
  },
  _type == "kontaktFormBlock" => {
    _type,
    _key,
    sectionTitle,
    sectionDescription,
    contactFieldLabel,
    contactPlaceholder,
    contactHint,
    messageFieldLabel,
    messagePlaceholder,
    messageHint,
    submitButtonText,
    submittingButtonText,
    errorMessage,
    successTitle,
    successBody,
    formAriaTitle
  },
  _type == "kontaktAndresBlock" => {
    _type,
    _key,
    name,
    role,
    description,
    highlights,
    websiteUrl,
    linkLabel,
    linkHref
  },
  _type == "kontaktOpstarBlock" => {
    _type,
    _key,
    name,
    tagline,
    description,
    bullets,
    linkLabel,
    linkHref
  },
  _type == "kontaktServicesBlock" => {
    _type,
    _key,
    sectionTitle,
    items,
    registerNote,
    registerButtonText,
    registerButtonHref
  },
  _type == "kontaktLegalNoteBlock" => {
    _type,
    _key,
    beforeLink,
    linkLabel,
    linkHref,
    afterLink
  }
`
