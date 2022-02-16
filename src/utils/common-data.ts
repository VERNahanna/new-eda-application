import {DepartmentBEModel, MenuObjectCommonKeys} from "./common-models";

export const departments: DepartmentBEModel[] = [
  {
    code: "RAW_MATERIALS",
    id: 1,
    name: {
      ar: "الخامات الدوائية",
      en: "Pharmaceutical Raw Materials"
    },
    description: null,
    section: [
      {
        department: null,
        code: "IMPORTATION_COSMETICS",
        id: 11,
        name: {
          ar: "خدمات استيراد",
          en: "Importation services"
        },
        description: null
      },
      {
        department: null,
        code: "RELEASE_COSMETICS",
        id: 12,
        name: {
          ar: "خدمات افراج",
          en: "Release services"
        },
        description: null
      }
    ]
  },
  {
    code: "PHARMACEUTICAL_PRODUCTS",
    id: 2,
    name: {
      ar: "المستحضرات الصيدلية",
      en: "Pharmaceutical Products"
    },
    description: null,
    section: [
      {
        department: null,
        code: "IMPORTATION_COSMETICS",
        id: 11,
        name: {
          ar: "خدمات استيراد",
          en: "Importation services"
        },
        description: null
      },
      {
        department: null,
        code: "RELEASE_COSMETICS",
        id: 12,
        name: {
          ar: "خدمات افراج",
          en: "Release services"
        },
        description: null
      }
    ]
  },
  {
    code: "BIOLOGICAL",
    id: 3,
    name: {
      ar: "المستحضرات الحيوية",
      en: "Biological Products"
    },
    description: null,
    section: [
      {
        department: null,
        code: "IMPORTATION_COSMETICS",
        id: 11,
        name: {
          ar: "خدمات استيراد",
          en: "Importation services"
        },
        description: null
      },
      {
        department: null,
        code: "RELEASE_COSMETICS",
        id: 12,
        name: {
          ar: "خدمات افراج",
          en: "Release services"
        },
        description: null
      }
    ]
  },
  {
    code: "NARCOTICS",
    id: 4,
    name: {
      ar: "المستحضرات والمواد المخدرة",
      en: "Narcotics"
    },
    description: null,
    section: [
      {
        department: null,
        code: "IMPORTATION_COSMETICS",
        id: 11,
        name: {
          ar: "خدمات استيراد",
          en: "Importation services"
        },
        description: null
      },
      {
        department: null,
        code: "RELEASE_COSMETICS",
        id: 12,
        name: {
          ar: "خدمات افراج",
          en: "Release services"
        },
        description: null
      }
    ]
  },
  {
    code: "DETERGENTS_PESTICIDES",
    id: 5,
    name: {
      ar: "المبيدات الحشرية والمطهرات",
      en: "Detergents and Pesticides"
    },
    description: null,
    section: [
      {
        department: null,
        code: "IMPORTATION_COSMETICS",
        id: 11,
        name: {
          ar: "خدمات استيراد",
          en: "Importation services"
        },
        description: null
      },
      {
        department: null,
        code: "RELEASE_COSMETICS",
        id: 12,
        name: {
          ar: "خدمات افراج",
          en: "Release services"
        },
        description: null
      }
    ]
  },
  {
    code: "COSMETICS",
    id: 6,
    name: {
      ar: "مستحضرات التجميل",
      en: "Cosmetics Products"
    },
    description: null,
    section: [
      {
        department: null,
        code: "IMPORTATION_COSMETICS",
        id: 11,
        name: {
          ar: "خدمات استيراد",
          en: "Importation services"
        },
        description: null
      },
      {
        department: null,
        code: "RELEASE_COSMETICS",
        id: 12,
        name: {
          ar: "خدمات افراج",
          en: "Release services"
        },
        description: null
      }
    ]
  },
  {
    code: "EXEMPTION",
    id: 7,
    name: {
      ar: "الإعفاءات",
      en: "Pharmaceutical Exemption"
    },
    description: null,
    section: [
      {
        department: null,
        code: "IMPORTATION_COSMETICS",
        id: 11,
        name: {
          ar: "خدمات استيراد",
          en: "Importation services"
        },
        description: null
      },
      {
        department: null,
        code: "RELEASE_COSMETICS",
        id: 12,
        name: {
          ar: "خدمات افراج",
          en: "Release services"
        },
        description: null
      }
    ]
  }
];

export const menuObjectKeys: MenuObjectCommonKeys = {
  RAW_MATERIALS: {
    baseLink: '/pages/pharmaceutical-raw-material',
    baseIcon: 'fas fa-pills',
    servicesIcon: 'fas fa-pills',
    newRequestLink: '#',
    draftListLink: '#',
    trackListLink: '#',
    dropdownLinks: {
      IMPORTATION_COSMETICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_COSMETICS: {
        link: '#',
        icon: 'fas fa-dolly-flatbed'
      }
    }
  },
  PHARMACEUTICAL_PRODUCTS: {
    baseLink: '#',
    baseIcon: '',
    servicesIcon: '',
    newRequestLink: '#',
    draftListLink: '#',
    trackListLink: '#',
    dropdownLinks: {
      IMPORTATION_COSMETICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_COSMETICS: {
        link: '#',
        icon: 'fas fa-dolly-flatbed'
      }
    }
  },
  BIOLOGICAL: {
    baseLink: '#',
    baseIcon: '',
    servicesIcon: '',
    newRequestLink: '#',
    draftListLink: '#',
    trackListLink: '#',
    dropdownLinks: {
      IMPORTATION_COSMETICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_COSMETICS: {
        link: '#',
        icon: 'fas fa-dolly-flatbed'
      }
    }
  },
  NARCOTICS: {
    baseLink: '#',
    baseIcon: '',
    servicesIcon: '',
    newRequestLink: '#',
    draftListLink: '#',
    trackListLink: '#',
    dropdownLinks: {
      IMPORTATION_COSMETICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_COSMETICS: {
        link: '#',
        icon: 'fas fa-dolly-flatbed'
      }
    }
  },
  DETERGENTS_PESTICIDES: {
    baseLink: '#',
    baseIcon: '',
    servicesIcon: '',
    newRequestLink: '#',
    draftListLink: '#',
    trackListLink: '#',
    dropdownLinks: {
      IMPORTATION_COSMETICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_COSMETICS: {
        link: '#',
        icon: 'fas fa-dolly-flatbed'
      }
    }
  },
  COSMETICS: {
    baseLink: '/pages/cosmetics-product',
    baseIcon: 'fas fa-medkit',
    servicesIcon: 'fas fa-medkit',
    newRequestLink: '/pages/cosmetics-product/inner/new-request',
    draftListLink: '/pages/cosmetics-product/inner/draft-request',
    trackListLink: '/pages/cosmetics-product/inner/track-request',
    dropdownLinks: {
      IMPORTATION_COSMETICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_COSMETICS: {
        link: '/pages/cosmetics-product/inner/release-services',
        icon: 'fas fa-dolly-flatbed'
      }
    }
  },
  EXEMPTION: {
    baseLink: '#',
    baseIcon: '',
    servicesIcon: '',
    newRequestLink: '#',
    draftListLink: '#',
    trackListLink: '#',
    dropdownLinks: {
      IMPORTATION_COSMETICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_COSMETICS: {
        link: '#',
        icon: 'fas fa-dolly-flatbed'
      }
    }
  }
};
