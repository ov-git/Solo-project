import DrinkDetails from "../../../../components/DrinkDetails";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const DrinkDetailPage = ({ params }: Props) => {
  return <DrinkDetails params={params} />;
};

export default DrinkDetailPage;
