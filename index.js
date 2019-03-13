//Library
function createStore(reducer){
//The store should have four parts:
//1. The state
//2. Get the state
//3. Listen to changes on the state
//4. Update the state

    let state
    let listeners = []

    const getState = () => state
    
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    
    return {
        getState,
        subscribe, 
        dispatch,
    }
}

//app code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'



//this is a reducer function
function todos(state = [], action){
    switch(action.type){
        case ADD_TODO :
          return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
            state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, { complete: !todo.complete }))
        default:
            return state
    }
}


//another reducer function
function goals (state = [], action){
    switch(action.type) {
        case ADD_GOAL :
            return state.concat([action.goal])
        case REMOVE_GOAL :
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

//acts as a "root" reducer
function app (state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

//only need to pass in a single reducer here
const store = createStore(app);

store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

store.dispatch({
    type: ADD_TODO,
    todo: {
      id: 0,
      name: 'Learn Redux',
      complete: false
    }
})

store.dispatch({
    type: REMOVE_TODO,
    todo: {
      id: 1
    }
})

store.dispatch({
    type: TOGGLE_TODO,
    id: 0
})

store.dispatch({
    type: ADD_GOAL,
    goal: {
      id: 0,
      name: 'Learn Redux'
    }
})

store.dispatch({
    type: REMOVE_GOAL,
    id: 0,
})
    
