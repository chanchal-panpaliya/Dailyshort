import {
    getpin,
    getdate,
    getSearchCart
} from '../../my-webapp/page/subpages/utility/filterutility';

const InitialReducerState = 
[
    {
        color: '#555555',
        date: '22/06/2021 13:59:01',
        desc: '<p>title 1</p>\n',
        id: 'c2519b66-8789-4082-904e-42ebad901e2e',
        label: 'label 1',
        pin: true,
        priority: 'High',
        tags: [],
        title: 'title 1',
        _id: '1'
    },
    {
        color: '#555555',
        date: '22/06/2022 13:59:01',
        desc: '<p>title 2</p>\n',
        id: 'c2519b66-8789-4082-904e-42ebad901e2e',
        label: 'label 2',
        pin: false,
        priority: 'Low',
        tags: [],
        title: 'title 2',
        _id: '2'
    },
    {
        color: '#555555',
        date: '22/01/2022 13:59:01',
        desc: '<p>title 3</p>\n',
        id: 'c2519b66-8789-4082-904e-42ebad901e2e',
        label: 'label 3',
        pin: false,
        priority: 'Low',
        tags: [],
        title: 'title 3',
        _id: '3'
    },
]


describe("testing getdate", () => {
it("should set get Search note", () => {
    let title = "title 3"
    const state = getSearchCart(InitialReducerState, title);
    const expectedState = InitialReducerState.filter((item)=>item.title.toLowerCase().includes(title.toLowerCase()))
    expect(state).toEqual(expectedState);
 });
})