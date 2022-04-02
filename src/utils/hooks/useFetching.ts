import {useState} from "react";

export const useFetching = <T, R>(callback: (...args: T[]) => R) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args: any) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] as const;
}


