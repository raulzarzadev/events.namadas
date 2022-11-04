import { Toggle } from '@comps/inputs';
import ImagesList from '@comps/inputs/inputFiles_V2/imagesList';
import Section from '@comps/Section';
import { updateUser } from '@firebase/Users/main';
import { CompanyInfo } from '@firebase/Users/user.model';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';

const CompanySection = ({
  companyInfo,
  isCompany,
}: {
  isCompany?: boolean;
  companyInfo?: CompanyInfo;
}) => {
  if (!companyInfo) return <></>;
  const { email, phone, images = [], resume } = companyInfo;
  const {
    user: { id: userId },
  } = useAuth();
  const [_isCompany, _setIsCompany] = useState(isCompany);
  const [buttonVisible, setButtonVisible] = useState(false);
  const handleChange = (checked: boolean) => {
    _setIsCompany(checked);
    setButtonVisible(true);
  };
  const handleSubmit = () => {
    updateUser(userId, {
      profileType: { isCompany: _isCompany },
    })
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        setButtonVisible(false);
      });
  };
  return (
    <div>
      {isCompany ? (
        <div>
          <div>
            <h4 className="font-bold text-center">Contact: </h4>
            <p className=" text-center">{email || 'sin'}</p>
            <p className=" text-center">{phone || 'sin'}</p>
          </div>
          <ImagesList images={images} />
          <div>
            <h4 className="font-bold text-center">Resume:</h4>
            <p className=" text-center whitespace-pre-line">{resume}</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center">Set your profile as company</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e.target);
            }}
          >
            <Toggle
              label="Is a company profile"
              onChange={({ target: { checked } }) => {
                handleChange(checked);
              }}
            />
            <button disabled={!buttonVisible} className="btn">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompanySection;
