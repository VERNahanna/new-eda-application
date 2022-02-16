export interface CardsList {
  id: string,
  name: {
    ar: string,
    en: string
  },
  description: {
    ar: string
    en: string,
  },
  newRequestLink: string,
  draftListLink: string,
  trackListLink: string,
  icon: string
}

export interface DepartmentBEModel {
  code: string,
  id: number,
  name: {
    ar: string,
    en: string
  },
  description: {
    ar: string,
    en: string
  } | null,
  section: DepartmentSectionsBEModel[]
}

export interface DepartmentSectionsBEModel {
  department: string | null,
  code: string,
  id: number,
  name: {
    ar: string,
    en: string
  },
  description: {
    ar: string,
    en: string
  } | null
}

export interface DepartmentIntegratingModel {
  code: string,
  id: number,
  name: {
    ar: string,
    en: string
  },
  link: string,
  dropDownStatus: boolean,
  icon: string,
  description: {
    ar: string,
    en: string
  } | null,
  dropdownLinks: DepartmentSectionsBEModel[]
}

export interface DepartmentSectionsIntegratingModel {
  department: string | null,
  code: string,
  id: number,
  name: {
    ar: string,
    en: string
  },
  description: {
    ar: string,
    en: string
  } | null,
  link: string,
  icon: string,
}

export interface MenuObjectCommonKeys {
  RAW_MATERIALS: MenuObjectCommonKeysItem,
  PHARMACEUTICAL_PRODUCTS: MenuObjectCommonKeysItem,
  BIOLOGICAL: MenuObjectCommonKeysItem,
  NARCOTICS: MenuObjectCommonKeysItem,
  DETERGENTS_PESTICIDES: MenuObjectCommonKeysItem,
  COSMETICS: MenuObjectCommonKeysItem,
  EXEMPTION: MenuObjectCommonKeysItem
}

export interface MenuObjectCommonKeysItem {
  baseLink: string,
  baseIcon: string,
  servicesIcon: string,
  newRequestLink: string,
  draftListLink: string,
  trackListLink: string,
  dropdownLinks: {
    IMPORTATION_COSMETICS: {
      link: string,
      icon: string
    },
    RELEASE_COSMETICS: {
      link: string,
      icon: string
    }
  }
}
