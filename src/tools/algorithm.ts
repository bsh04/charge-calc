import {Elements, IAdmixtures, IMass, Substance, SubstancesData} from "../types";

export const Algorithm = (data: Array<SubstancesData>, mass: Array<IMass>, admixtures: Array<IAdmixtures>) => {
    let count = 0
    let PrevMass: Array<undefined> | Array<IMass> = []
    let PrevAdmixtures: Array<undefined> | Array<IAdmixtures> = []
    let Mass: Array<IMass> = JSON.parse(JSON.stringify(mass))
    let Admixtures: Array<IAdmixtures> = JSON.parse(JSON.stringify(admixtures))

    const start = () => {
        PrevAdmixtures = Admixtures
        PrevMass = JSON.parse(JSON.stringify(Mass))
        data.map((sub, index) => {
            Mass.find((mas) => mas.name === sub.name)!.value = +(((sub.resultPercent - (admixturesCalc(index, sub.mainElement))) * 100) / Number(sub.elements.find(e => e.title === sub.mainElement)!.value)).toFixed(3)
            sub.elements.map((element) => {
                if (element.value !== 0) {
                    Admixtures.find(a => a.name === sub.name)!.elements.find(e => e.title === element.title)!.value = ((Number(Mass.find((mas) => mas.name === sub.name)!.value) * Number(sub.elements.find(e => e.title === element.title)!.value)) / 100).toFixed(3)
                }
            })
        })
        if (JSON.stringify(PrevMass) !== JSON.stringify(Mass)) {
            start()
            count++
        }
    }

    const admixturesCalc = (index: number, main: Elements) => {
        let sum = 0
        data.map((sub, key) => {
            sum += (index !== key) && (sub.elements.find(e => e.title === main)!.value !== 0) ? checkAdmixtures(main, sub.name as Substance) || ((sub.resultPercent * Number(sub.elements.find(e => e.title === main)!.value)) / 100) : 0
        })
        return sum
    }

    const checkAdmixtures = (main: Elements, name: Substance) => {
        let admixture: number | string | undefined = 0
        Admixtures.map(admix => {
            admix.elements.map(a => {
                if (a.title === main && a.value !== 0 && admixture === 0 && name === admix.name) {
                    admixture = a.value
                }
            })
        })
        return admixture === 0 ? false : Number(admixture)
    }

    start()
    return {mass: Mass, admixtures: Admixtures}
}
