import dayjs from "dayjs";

export type Route = {
    coordinates: any[]
    date: string | number | dayjs.Dayjs | Date | null | undefined
    description: string
    estimatedDuration: number
    name: string
    userId: string
    _id: string
    interestingPlaces?: InterestingPlaces[]
  };
  export type InterestingPlaces = {
    xid: string
    name: string
    kinds: string
    osm: string
    wikidata: string
    dist: number
    point: Point
    rate?: number
    routeId?: string
  }

  export type Point = {
    lon: number
    lat: number
  }