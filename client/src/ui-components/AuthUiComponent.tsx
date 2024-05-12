import React, { FC, ReactNode } from "react";
interface AuthUiComponentProp {
  children: ReactNode;
}
const AuthUiComponent: FC<AuthUiComponentProp> = ({ children }) => {
  return (
    <div className="flex w-full gap-1">
      <div className="md:w-[40%] lg:w-[50%] md:block hidden">
        <img
          src="/leftside.png"
          alt="companyImage"
          className="h-screen w-[740px]"
        />
      </div>
      <div className="md:w-[60%] lg:w-[50%] w-[90%] flex flex-col xl:px-16 2xl:px-32 md:px-12 lg:mr-40 mx-auto">
        <div className="flex flex-col items-center">
          <div className="logo bg-[#7BC] xl:h-36 xl:w-36 md:h-28 md:w-28 w-20 h-20 rounded-full mt-10"></div>
          <div className="text-center xl:px-5 mt-4">
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
