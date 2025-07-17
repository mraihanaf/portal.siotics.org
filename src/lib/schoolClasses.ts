import { SchoolClasses } from "@/constants/schoolClasses";

export function toMajorAbbreviation(major: string): string | null {
    const schoolClass = SchoolClasses.find((schoolClass) => schoolClass.major === major)
    return schoolClass ? schoolClass.majorAbbreviation : null
}