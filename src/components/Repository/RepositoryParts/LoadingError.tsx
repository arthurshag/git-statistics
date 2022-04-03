import React, {FC} from "react";

interface IProps {
    error?: string | null,
    isLoading: boolean,
    className?: string
}


const LoadingError: FC<IProps> = ({
                                      error,
                                      isLoading,
                                      children,
                                      className,
                                  }) => {
    return <div className={className}>
        {error ? error : isLoading ? "Loading... " : children}
    </div>
}

export default LoadingError;
