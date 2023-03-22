import DrinkDetails from "../../../../components/DrinkDetails/DrinkDetails";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const DrinkDetailsPage = ({ params }: Props) => {
  return (
    <>
      {/* @ts-ignore */}
      <DrinkDetails params={params} />;
    </>
  );
};

export default DrinkDetailsPage;
