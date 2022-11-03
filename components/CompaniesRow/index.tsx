import CompanyCard, { CompanyCardType } from '@comps/CompanyCard';
import Icon from '@comps/Icon';
import { IconName } from '@comps/Icon/icons-list';
import { sortFromNow } from 'utils/myFormatDate';

const CompaniesRow = ({
  companies,
  title = 'Events',
  iconName,
  subtitle,
}: {
  companies: CompanyCardType[];
  title: string;
  iconName?: IconName;
  subtitle?: string;
}) => {
  return (
    <div className=" mx-auto">
      <div className="flex items-end ">
        <h3 className="text-lg  font-bold mt-4 ">{title}</h3>
        {subtitle && <span className="mb-1 text-xs mx-1">{subtitle}</span>}
        {iconName && (
          <span className="mb-1">
            <Icon name={iconName} />
          </span>
        )}
      </div>
      <div className="grid ">
        <div className="flex flex-row gap-2 overflow-x-auto pb-4 h-[185px] ">
          {companies?.sort(sortFromNow).map((company) => (
            <CompanyCard key={company?.id} size="sm" company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesRow;
