import NoteFilter from "../../my-webapp/context/NoteFilter";

const InitialReducerState={
    isChecked:["ok","ok12"],
    priority:"",
    sortdate:"",
    search:"",
    sortpin:""
}

describe("testing FilterReducer", () => {

//Filter label add
it("should set the label check box add", () => {
    let data = "ok13"
    const expectedState = {
       ...InitialReducerState,
       isChecked : [...InitialReducerState.isChecked,data]
    }
    const state = NoteFilter(InitialReducerState, {
        type: "TOGGLE_CHECKBOX",
        payload: data,
        status:true
    });
    expect(state).toEqual(expectedState);
});
//Filter label removed
it("should set the label check box removed", () => {
    const expectedState = {
       ...InitialReducerState,
       isChecked :InitialReducerState.isChecked.filter((item)=>item!=="ok12")
    }
    const state = NoteFilter(InitialReducerState, {
        type: "TOGGLE_CHECKBOX",
        payload: "ok12",
        status:false
    });
    expect(state).toEqual(expectedState);
});
//Filter priority
it("should set the label check box priority", () => {
    const expectedState = {
       ...InitialReducerState,
       priority : "High"
    }
    const state = NoteFilter(InitialReducerState, {
        type: "PRIORITY",
        value: "High",
    });
    expect(state).toEqual(expectedState);
});
//Filter date
it("should set the label check box priority", () => {
    const expectedState = {
       ...InitialReducerState,
       sortdate : "Newest"
    }
    const state = NoteFilter(InitialReducerState, {
        type: "DATE_SORT",
        value: "Newest",
    });
    expect(state).toEqual(expectedState);
});
//Filter pin note
it("should set the filter pin", () => {
    const expectedState = {
       ...InitialReducerState,
       sortpin : "pin"
    }
    const state = NoteFilter(InitialReducerState, {
        type: "PIN_SORT",
        value: "pin",
    });
    expect(state).toEqual(expectedState);
});
//Filter clear filter
it("should set the clear filter", () => {
    const expectedState = {
        isChecked:[],
        priority:"",
        sortdate:"",
        search:"",
        sortpin:""  
    }
    const state = NoteFilter(InitialReducerState, {
        type: "CLEAR_FILTER",
    });
    expect(state).toEqual(expectedState);
});
//search filter
it("should set the search filter", () => {
    const expectedState = {
        ...InitialReducerState,
        search:"okok",
    }
    const state = NoteFilter(InitialReducerState, {
        type: "SEARCH_BY_TITLE",
        payload:"okok"
    });
    expect(state).toEqual(expectedState);
});
})