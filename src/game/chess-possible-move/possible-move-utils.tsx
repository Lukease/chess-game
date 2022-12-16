export const getCorrectIds = (getCorrectFieldsId: Array<string>, color: string) => {
    return (getCorrectFieldsId.reduce((acc, item) => {
            const elementInAcc = acc.find(id => id === 'last')
            const field: HTMLElement = document.getElementById(item)!

            if (!elementInAcc) {
                if (field.className.includes(`figure__${color}`)) {

                    return [...acc, 'last']
                } else if (field.className.includes(`figure__empty`)) {

                    return [...acc, item]
                } else if (!field.className.includes(`figure__${color}`)) {

                    return [...acc, item, 'last']
                }
            }
            return [...acc]

        }, [] as string[])
    )
}

export const getCorrectIdsOfPawn = (getCorrectFieldsId: Array<string>, color: string) => {
    return (getCorrectFieldsId.reduce((acc, item) => {
            const elementInAcc = acc.find(id => id === 'last')
            const field: HTMLElement = document.getElementById(item)!

            if (!elementInAcc) {
                if (field.className.includes(`figure__${color}`)) {

                    return [...acc, 'last']
                } else if (field.className.includes(`figure__empty`)) {

                    return [...acc, item]
                } else if (!field.className.includes(`figure__${color}`)) {

                    return [...acc, 'last']
                }
            }
            return [...acc]

        }, [] as string[])
    )
}