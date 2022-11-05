import CompanyDetails from "@comps/CompanyDetails";
import Head from "next/head";

const Company = () => {
  return (
    <>
    <Head>
      <title>
        Company
      </title>
    </Head>
    <div>
      <CompanyDetails/>
    </div>
    </>
  );
}

export default Company;