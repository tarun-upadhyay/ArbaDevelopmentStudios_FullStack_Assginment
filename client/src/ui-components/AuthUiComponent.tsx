import React, { FC, ReactNode } from "react";
interface AuthUiComponentProp {
  children: ReactNode;
}
const AuthUiComponent: FC<AuthUiComponentProp> = ({ children }) => {
  return (
    <div className="flex w-full">
      <div className="w-[50%]">
        <img src="/leftside.png" alt="companyImage" className="h-full" />
      </div>
      <div className="w-[50%] flex flex-col px-36">
        <div className="flex flex-col items-center px-16">
          <div className="logo bg-[#7BC] h-36 w-36 rounded-full mt-10"></div>
          <div className="text-center px-5 mt-4">
            <h3 className="text-4xl font-bold">APP NAME</h3>
            <p className="text-xl font-normal">
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
