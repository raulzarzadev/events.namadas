import ManageEvent from '@comps/events/ManageEvent'
import PrivatePage from 'HOCS/PrivatePage'

const Manage = () => {
  return (
    <div>
      <PrivatePage>
        <ManageEvent />
      </PrivatePage>
    </div>
  )
}

export default Manage
