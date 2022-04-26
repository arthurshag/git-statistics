import {ReposUrlParamsType} from "./hooks/useReposFilterParams";

export function validateReposFilters(params: ReposUrlParamsType) {
    const validatedParams = {...params};

    if (validatedParams.starsMin && validatedParams.starsMax) {
        if (Number(validatedParams.starsMax) < Number(validatedParams.starsMin)){
            validatedParams.starsMin = params.starsMax;
            validatedParams.starsMax = params.starsMin;
        }
    }

    if (validatedParams.createdFrom && validatedParams.createdTo) {
        if (new Date(validatedParams.createdFrom).valueOf() > new Date(validatedParams.createdTo).valueOf()){
            validatedParams.createdTo = params.createdFrom;
            validatedParams.createdFrom = params.createdTo;
        }
    }

    if (validatedParams.pushedFrom && validatedParams.pushedTo) {
        if (new Date(validatedParams.pushedFrom).valueOf() > new Date(validatedParams.pushedTo).valueOf()){
            validatedParams.pushedTo = params.pushedFrom;
            validatedParams.pushedFrom = params.pushedTo;
        }
    }

    return validatedParams;
}
