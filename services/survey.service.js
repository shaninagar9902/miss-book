export const surveyService = {
    getById
}

function getById() {
    return Promise.resolve(survey)
}

const survey = {
    title: 'Robots Shopping',
    cmps: [
        {
            type: 'TextBox',
            id: 'c101',
            info: {
                label: 'Your fullname:'
            }
        },
        {
            type: 'TextBox',
            id: 'c103',
            info: {
                label: 'Your address:'
            }
        },
        {
            type: 'SelectBox',
            id: 'c102',
            info: {
                label: 'How was it:',
                opts: ['Great', 'Fine', 'Crap', 'Worst Ever']
            }
        }
    ]
}