import ToastReducer from "../../my-webapp/context/Toast/ToastReducer";

const InitialReducerState={
    showToast:false , toastList : []
}

describe("testing toastReducer", () => {
   //SUCCESS toast
    it("should set toast SUCCESS", () => {
        const state = ToastReducer(InitialReducerState, {
            type: "SUCCESS",
            payload:"success toast payload",
        });
        const expectedState = {
            ...InitialReducerState,
            toastList:[{
                backgroundColor: state.toastList[0].backgroundColor ,
                description: state.toastList[0].description ,
                id: state.toastList[0].id ,
                title: state.toastList[0].title ,  
              }]
        }
        expect(state).toEqual(expectedState);
    });
    //DANGER toast
    it("should set toast DANGER", () => {
        const state = ToastReducer(InitialReducerState, {
            type: "DANGER",
            payload:"danger toast payload",
        });
        const expectedState = {
            ...InitialReducerState,
            toastList:[{
                   backgroundColor: state.toastList[0].backgroundColor ,
                   description: state.toastList[0].description ,
                   id: state.toastList[0].id ,
                   title: state.toastList[0].title ,  
              }]
        }
        expect(state).toEqual(expectedState);
    });
     //INFO toast
     it("should set toast INFO", () => {
        const state = ToastReducer(InitialReducerState, {
            type: "INFO",
            payload:"info toast payload",
        });
        const expectedState = {
            ...InitialReducerState,
            toastList:[{
                   backgroundColor: state.toastList[0].backgroundColor ,
                   description: state.toastList[0].description ,
                   id: state.toastList[0].id ,
                   title: state.toastList[0].title ,  
              }]
        }
        expect(state).toEqual(expectedState);
    });
    //WARNING toast
    it("should set toast WARNING", () => {
        const state = ToastReducer(InitialReducerState, {
            type: "WARNING",
            payload:"warning toast payload",
        });
        const expectedState = {
            ...InitialReducerState,
            toastList:[{
                   backgroundColor: state.toastList[0].backgroundColor ,
                   description: state.toastList[0].description ,
                   id: state.toastList[0].id ,
                   title: state.toastList[0].title ,  
              }]
        }
        expect(state).toEqual(expectedState);
    });
    //REMOVE_TOAST
    it("should set toast REMOVE_TOAST", () => {
        const REMOVEReducerState = {
            showToast:false , 
            toastList : [
                {
                    id:Math.random(),
                    title: 'INFO',
                    description: 'info desc',
                    backgroundColor: '#5bc0de'
                },
                {
                    id:Math.random(),
                    title: 'INFO',
                    description: 'info desc',
                    backgroundColor: '#5bc0de'
              },
          ]  
        }

        const state = ToastReducer(REMOVEReducerState, {
            type: "REMOVE_TOAST",
            payload:REMOVEReducerState.toastList[0].id,
        });
        const expectedState = {
            ...REMOVEReducerState,
            toastList:[...REMOVEReducerState.toastList.filter((item)=>item.id !== REMOVEReducerState.toastList[0].id)]
        }
        expect(state).toEqual(expectedState);
    });
})