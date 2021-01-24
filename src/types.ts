export interface IElements {
    silicon: number,
    r2o3: number,
    cal: number,
    magne: number,
    ro2: number,
}

export interface IElement {
    title: Elements
    value?: number | string
}

export enum Elements {
    silicon =  "SILICON", // Кремний
    r2o3 = "R2O3",
    cal = "CAL",
    magne = "MAGNE",
    ro2 = "RO2",
}

export const ElementsView = {
    [Elements.silicon]: "Кремний",
    [Elements.r2o3]: "Алюминий",
    [Elements.cal]: "Кальций",
    [Elements.magne]: "Магний",
    [Elements.ro2]: "Щелочи",
}

export enum FORM {
    Elements = "Elements"
}

