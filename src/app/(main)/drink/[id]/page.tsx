import DrinkDetails from "../../../../components/DrinkDetails";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const DrinkDetailPage = ({ params }: Props) => {
  //@ts-ignore
  return <DrinkDetails params={params} />;
};

export default DrinkDetailPage;
