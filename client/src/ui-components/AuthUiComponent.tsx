import React, { FC, ReactNode } from "react";
interface AuthUiComponentProp {
  children: ReactNode;
}
const AuthUiComponent: FC<AuthUiComponentProp> = ({ children }) => {
  return (
    <div className="flex w-full">
      <div className="h-[120vh] bg-[#7BC9FF] w-[50%] relative">
        <div className="h-[20rem] w-[20rem] bg-[#7BC] rounded-full top-[-3rem] left-[-3rem] absolute"></div>
        <div className="h-[20rem] w-[20rem] bg-[#7BC] rounded-full bottom-[-1rem] right-0 absolute z-0"></div>
      </div>
      <div className="w-[50%] flex flex-col px-36">
        <div className="flex flex-col items-center px-16">
          <div className="logo bg-[#7BC] h-36 w-36 rounded-full mt-10"></div>
          <div className="text-center px-5 mt-4">
            <h3 className="text-4xl font-bold">APP NAME</h3>
            <p className="text-xl font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthUiComponent;
