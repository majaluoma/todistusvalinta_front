import { DegreeObject, VolumeObject } from "@/types/apiTypes";

export type DegreeItemProps = {
    degree : DegreeObject;
}

export type VolumeItemProps = {
    volume : VolumeObject;
    degree : DegreeObject
}

export type SearchbarProps = {
    searchFunction: (string: string | null) => void;
  };