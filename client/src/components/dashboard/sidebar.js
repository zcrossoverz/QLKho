import React, { useState } from 'react'
import { ArchiveIcon } from '@heroicons/react/solid'
import { HomeIcon, OfficeBuildingIcon, IdentificationIcon, CurrencyDollarIcon, TruckIcon, FilterIcon, PlusCircleIcon, AdjustmentsIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

    const [activeTab, setActiveTab] = useState(0);
    let navigate = useNavigate();

    const listNav = [
        { icon: HomeIcon, path:"/dashboard" },
        { icon: TruckIcon, path:"/dashboard" },
        { icon: CurrencyDollarIcon, path:"/dashboard" },
        { icon: OfficeBuildingIcon, path:"/dashboard" },
        { icon: IdentificationIcon, path:"/dashboard" },
        { icon: FilterIcon, path:"/dashboard" },
        { icon: PlusCircleIcon, path:"/dashboard" },
        // { icon: AdjustmentsIcon, path:"/dashboard" },
    ];

    let Button = (props) => {
        let Icon = props.icon;
        return (
                <div className={ props.active ? 'bg-gray-800 rounded-l-xl relative after:absolute after:w-4 after:h-8 after:-bottom-8 after:rounded-tr-xl after:right-0 after:shadow-inverse-bottom before:absolute before:w-4 before:h-8 before:-top-8 before:rounded-br-xl before:right-0 before:shadow-inverse-top' : ''}>
                    <button className='p-3 my-3 ml-3 mr-6 text-primary rounded-xl hover:bg-primary hover:text-white hover:shadow-primary'
                        onClick={() => {
                            setActiveTab(props.index);
                            navigate(props.path, { replace:false });
                        }}>
                        <Icon className='h-6' />
                    </button>
                </div>
        )
    }
    

  return (
    <div className='flex flex-col bg-gray-900 py-4 pl-2 items-center'>
        <div className='p-2 mr-4 mt-3 mb-3 rounded-xl bg-opacity-20 bg-orange-500'>
            <ArchiveIcon className='h-10 text-red-300' />
        </div>
        <div className='flex flex-col gap-y-4 mt-4 items-end self-end'>

            { listNav.map((e,i) => {
                return <Button key={i.toString()} icon={e.icon} active={ i === activeTab ? true:false } index={i} path={e.path} />
            }) }

        </div>
    </div>
  )

  
}

