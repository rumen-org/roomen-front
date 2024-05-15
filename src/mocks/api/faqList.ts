import { graphql, HttpResponse } from 'msw'

export const handlers = [
    graphql.query('ListPets', () => {
        return HttpResponse.json({
            data: {
                pets: [
                    { id: 1, name: 'Tom' },
                    { id: 2, name: 'Jerry' },
                    { id: 3, name: 'Spike' },
                ],
            },
        })
    }),
]
