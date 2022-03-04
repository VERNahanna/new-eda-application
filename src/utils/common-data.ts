import {DepartmentBEModel, MenuObjectCommonKeys} from "./common-models";

export const menuObjectKeys: MenuObjectCommonKeys = {
  RAW_MATERIALS: {
    baseLink: '/pages/pharmaceutical-raw-material',
    baseIcon: 'fas fa-pills',
    servicesIcon: 'fas fa-pills',
    newRequestLink: '#',
    draftListLink: '#',
    trackListLink: '#',
    dropdownLinks: {
      IMPORTATION_RAW_MATERIALS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_RAW_MATERIALS: {
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
      IMPORTATION_PHARMACEUTICAL_PRODUCTS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_PHARMACEUTICAL_PRODUCTS: {
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
      IMPORTATION_BIOLOGICAL: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_BIOLOGICAL: {
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
      IMPORTATION_NARCOTICS: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_NARCOTICS: {
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
      IMPORTATION_DETERGENTS_PESTICIDES: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      },
      RELEASE_DETERGENTS_PESTICIDES: {
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
      EXEMPTION: {
        link: '#',
        icon: 'fas fa-shipping-fast',
      }
    }
  }
};

export const commonKeysWithId: any = {
  1: 'RAW_MATERIALS',
  2: 'PHARMACEUTICAL_PRODUCTS',
  3: 'BIOLOGICAL',
  4: 'NARCOTICS',
  5: 'DETERGENTS_PESTICIDES',
  6: 'COSMETICS',
  7: 'EXEMPTION'
};

export const typeOfRequest = {
  "importation-services": "APPROVAL",
  "release-services": "CUSTOMS_RELEASE"
}
