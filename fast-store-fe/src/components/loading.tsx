import * as React from "react";

interface LoadingProps {}

const Loading: React.FunctionComponent<LoadingProps> = () => {
        return (
                <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                </div>
        );
};

export default Loading;
