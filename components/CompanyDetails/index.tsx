import EventsRow from "@comps/events/eventsRow";
import ImagesList from "@comps/inputs/inputFiles_V2/imagesList";
import { getCompanyEvents } from "@firebase/Events/main";
import useAuth from "hooks/useAuth";
import useCompanies from "hooks/useCompanies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CompanyDetails = () => {
  const {user}=useAuth()
  const {query:{id}, push}=useRouter()
  const {getCompany}=useCompanies()
  const [company, setCompany]=useState<any>(undefined)
  const [companyEvents, setCompanyEvents]=useState(undefined)
  
  useEffect(()=>{
    if(id){
      getCompany(`${id}`).then(setCompany);
      getCompanyEvents(`${id}`).then((events: any) => setCompanyEvents(events));
    }
  },[id])

  if (company === undefined || companyEvents===undefined) return <div>Loading ...</div>;
  const {companyInfo, images}=company
  console.log(company)
  const isOwner = id === user?.id
  return (
    <div>
      <div>
        {isOwner ? (
          <div className="flex w-full justify-center my-4">
            <button className="btn btn-outline" onClick={()=>push(`/companies/${id}/edit`)}>edit</button>
          </div>
        ) : null}
      </div>
      <h2 className="text-center text-2xl font-bold">
        {companyInfo?.name || 'Agency name'}
      </h2>
      <div className="flex justify-center max-w-sm mx-auto flex-wrap">
        <ImagesList
          images={images}
          childrenClassName={'w-28 h-28'}
          showDelete={false}
        />
      </div>
      <div>
        <div>
          <EventsRow events={companyEvents} title="More Agency events" />
        </div>
      </div>
      <div>
        <h4>About us</h4>
        <p>{companyInfo.resume}</p>
      </div>
    </div>
  );
}

export default CompanyDetails;