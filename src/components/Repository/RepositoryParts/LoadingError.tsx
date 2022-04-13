import React, {FC} from "react";

interface IProps {
    error?: string | null,
    isLoading: boolean,
    className?: string
    style?: React.CSSProperties
}


const LoadingError: FC<IProps> = ({
                                      error,
                                      isLoading,
                                      children,
                                      className,
                                      style
                                  }) => {
    return <div className={className} style={style}>
        {error ? error : isLoading ? "ErrorGate... " : children}
    </div>
}

export default LoadingError;
