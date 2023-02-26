import DrinkDetails from "../../../../components/DrinkDetails";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const page = ({ params }: Props) => {
  return (
    <>
      <DrinkDetails params={params} />;
    </>
  );
};

export default page;
