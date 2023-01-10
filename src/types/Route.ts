import dayjs from "dayjs";

export type Route = {
    coordinates: any[]
    date: string | number | dayjs.Dayjs | Date | null | undefined
    description: string
    estimatedDuration: number
    name: string
    userId: string
    _id: string
  };
