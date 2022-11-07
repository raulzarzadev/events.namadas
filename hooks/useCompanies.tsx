import { getUser, getVisibleCompanies } from '@firebase/Users/main';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useCompanies = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<any>([]);
  // console.log(planingEvents);
  const formatUserAsCompany = ({
    companyInfo,
    id,
    images,
    displayName,
    alias,
    profileType,
    updatedAt,
  }: any) => {
    return {
      companyInfo,
      userId: id,
      id,
      images,
      displayName,
      alias,
      profileType,
      updatedAt,
    };
  };

  useEffect(() => {
    if (user)
      getVisibleCompanies().then((companies) => {
        setCompanies(companies.map((company) => formatUserAsCompany(company)));
      });
  }, []);

  const getCompany = async (id: string) => {
    const company = await getUser(id).then((res) => {
      return formatUserAsCompany(res);
    });
    return company;
  };

  return { companies, getCompany };
};

export default useCompanies;
