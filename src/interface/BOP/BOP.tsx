import { Dayjs } from "dayjs";

export interface BOP {
    id?: number;
    name: string;
    date: Dayjs | null;
    venue: string;
}