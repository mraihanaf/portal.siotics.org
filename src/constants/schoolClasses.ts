export interface ISchoolClass {
    major: string,
    majorAbbreviation: string
    parallelChoices: null | number[]
    gradeLevels: string[] | null,
}

export const SchoolClasses: ISchoolClass[] = [
    {
        major: "Rekayasa Perangkat Lunak",
        majorAbbreviation: "RPL",
        parallelChoices: null,
        gradeLevels: ["X","XI","XII"]
    },
    {
        major: "Sistem Informasi dan Jaringan",
        majorAbbreviation: "SIJA",
        parallelChoices: null,
        gradeLevels: ["X","XI","XII","XIII"]
    },
    {
        major: "Teknik Komputer dan Jaringan",
        majorAbbreviation: "TKJ",
        parallelChoices: null,
        gradeLevels: ["X","XI","XII"]
    },
    {
        major: "Desain Komunikasi Visual",
        majorAbbreviation: "DKV",
        parallelChoices: null,
        gradeLevels: ["X","XI","XII"]
    },
    {
        major: "Teknik Kendaraan Ringan",
        majorAbbreviation: "TKR",
        parallelChoices: [1,2],
        gradeLevels: ["X","XI","XII"]
    },
    {
        major: "Teknik Permesinan",
        majorAbbreviation: "TP",
        parallelChoices: [1,2],
        gradeLevels: ["X","XI","XII"]
    },
    {
        major: "Teknik Instalasi Tenaga Listrik",
        majorAbbreviation: "TITL",
        parallelChoices: [1,2,3],
        gradeLevels: ["X","XI","XII","XIII"]
    },
    {
        major: "Teknik Konstruksi dan Perumahan",
        majorAbbreviation: "TKP",
        parallelChoices: [1,2],
        gradeLevels: ["X","XI","XII"]
    },
    {
        major: "Desain Permodelan dan Informasi Bangunan",
        majorAbbreviation: "DPIB",
        parallelChoices: [1,2],
        gradeLevels: ["X","XI","XII"]
    },
    {
        major: "Desain Gambar Mesin",
        majorAbbreviation: "DGM",
        parallelChoices: null,
        gradeLevels: ["X","XI","XII"]
    }
]