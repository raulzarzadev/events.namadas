import CompanyForm from "@comps/forms/CompanyForm";
import { CompanyInfo, User } from "@firebase/Users/user.model";
import useCompanies from "hooks/useCompanies";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditCompany = () => {
  const {getCompany}=useCompanies()
  const {query:{id}} = useRouter()
  const [company, setCompany]=useState<undefined|User|null>(undefined)
  useEffect(()=>{
    if(id) getCompany(`${id}`).then((res:any)=>setCompany(res));
  },[id])
  if(!company) return <div>Loading</div>
  return (
    <>
    <Head>
      <title>
        {company.name}
      </title>
    </Head>
    <div className="max-w-md mx-auto ">
      <CompanyForm company={company?.companyInfo} />
    </div>
    </>
  );
}

export default EditCompany;