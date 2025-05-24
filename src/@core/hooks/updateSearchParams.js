export const updateSearchParamsHook = (searchParams, paramsKey, paramsValue, dispatch, paramsState) => {
    searchParams((params) => {
        params.set(paramsKey, paramsValue)
        const paramsItem = params.get(paramsKey)
        dispatch(paramsState(paramsItem))
        return params
    })
}