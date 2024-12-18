import { DegreeItemProps } from "./types";

export default function DegreeItem ({degree} : Readonly<DegreeItemProps>) {
    return (
  <>{degree.hakukohde}</>
    )
}