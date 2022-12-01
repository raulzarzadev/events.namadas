import { DistanceType, StyleType } from './tests.model'

export const getStyleInfo = (style: string) => {
  return STYLES.find(({ id }) => id === style)
}

export const STYLES: StyleType[] = [
  {
    label: 'C',
    id: 'crawl',
    largeLabel: 'Crol'
  },
  {
    label: 'D',
    id: 'back',
    largeLabel: 'Dorso'
  },
  {
    label: 'P',
    id: 'breast',
    largeLabel: 'Pecho'
  },
  {
    label: 'M',
    id: 'butterfly',
    largeLabel: 'Mariposa'
  },
  {
    label: 'CI',
    id: 'combi',
    largeLabel: 'Combi'
  }
  /* {
    label: 'RC',
    id: 'rcombi',
    largeLabel: 'Relevos combi'
  },
  {
    label: 'RL',
    id: 'rlibre',
    largeLabel: 'Relevos libre'
  } */
]

// eslint-disable-next-line no-sparse-arrays
export const DISTANCES: DistanceType[] = [
  {
    label: '25',
    id: '25'
  },
  {
    label: '50',
    id: '50'
  },
  {
    label: '100',
    id: '100'
  },
  {
    label: '200',
    id: '200'
  },
  {
    label: '400',
    id: '400'
  } /*
  {
    label: '800',
    id: '800'
  }, */
  /* {
    label: '4x25',
    id: '4x25'
  },
  {
    label: '4x50',
    id: '4x50'
  } */
]
