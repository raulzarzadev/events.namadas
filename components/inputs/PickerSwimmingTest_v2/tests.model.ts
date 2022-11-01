export interface StyleType {
  label: string;
  id: string
  largeLabel: string
}

export interface DistanceType {
label:string
id:string | number
}

export interface TestType {
  distance: DistanceType['id'],
  style: StyleType['id']
}