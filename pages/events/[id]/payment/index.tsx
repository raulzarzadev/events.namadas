import { useRouter } from "next/router";

const Payments = () => {
  const router = useRouter()
  return (
    <div>
      {router.asPath}
    </div>
  );
}

export default Payments;