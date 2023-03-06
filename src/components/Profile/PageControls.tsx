import { SetStateAction } from "react";

type Props = {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  length: number;
};

const PageControls = ({ page, setPage, length }: Props) => {
  return (
    <div className="flex justify-end w-full gap-5 px-6 py-4 text-white">
      <button
        className="disabled:text-gray-500"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <p>
        Page {page}/{Math.ceil(length / 5)}
      </p>
      <button
        className="disabled:text-gray-500"
        disabled={page >= Math.ceil(length / 5)}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PageControls;
