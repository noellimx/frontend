import { FC, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { FoodEstablishmentCard, getDashboardAll } from "../../../redux/store/slice/dashboardAll";
import { Link } from "react-router-dom";


const _FoodEstablishCardFC: FC<{ item: FoodEstablishmentCard }> = ({ item }) => {
    return <div className="flex border-2 py-[5px] px-[10px] rounded-[5px] min-w-[300px] flex-col">
        <div className="flex">


            <div className="flex border-b-2 border-b-primary-default w-fit">{`${item.sfaLicenseNo}`}</div>

            <div id="card-food-establishment-element-location" className="flex ml-auto">
                <div>{`??????`}</div>
            </div>


        </div>

        <div id="card-food-establishment-element-videos" className="flex">
            <div>{item.videos.map(v => <div className="flex"><div>{`${v.videoId}`}</div><Link to={`https://youtube.com/watch?v=${v.videoId}&t=${v.timestamp}`} target="_blank" rel="noopener noreferrer" >▸</Link>
            </div>)}</div>
        </div>


    </div>
}
const FoodEstablishmentsContainer = () => {
    const items = useAppSelector(s => s.dashboardAll.items);
    return <div className="flex flex-col">
        <h1>Food Establishments</h1>
        <h2 className="flex mt-[5px] space-x-5" id="content-all-items">  {items.map(item => <_FoodEstablishCardFC key={`fec-${item.sfaLicenseNo}`} item={item} />)}</h2>
    </div>
}


const ContentAll = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDashboardAll())
    }, [dispatch])


    return <div id="food-establishment-container" className="flex overflow-auto"><FoodEstablishmentsContainer /></div>
}

const DashboardSection: FC<PropsWithChildren<{ sectionId: string }>> = ({ children, sectionId }) => {
    return <div id={sectionId} className="flex mt-5 bg-white h-fit p-5  w-[100%]">{children}</div>
}
const Content: FC = () => {
    return <div className="flex w-[100%] "><DashboardSection sectionId="content-all"><ContentAll /></DashboardSection></div>
}

const Dashboard: FC = () => {
    return <div className="flex w-[100%] h-[100%] px-10 "><Content /></div>;
};



export default Dashboard