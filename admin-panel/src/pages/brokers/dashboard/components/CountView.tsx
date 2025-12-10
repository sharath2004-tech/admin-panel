import React from 'react'

const CountView = ({ icon,title,count }: { icon: React.ReactNode,title:string,count:number }) => {
    return (
      <div className="bg-white dark:bg-secondary-dark-bg px-5  py-3  flex-col  justify-between  rounded-md my-transition flex items-start border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-start space-y-1">
          <h3 className="font-normal text-sm dark:text-gray-400">{title}</h3>
          <h3 className="font-bold text-xl dark:text-gray-300">{count}</h3>
        </div>
    
        {icon}
      </div>
    );
  }
export default CountView